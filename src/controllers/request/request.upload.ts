import { Request as ExpressRequest, Response } from "express";
import * as XLSX from "xlsx";
import knex from "../../database";

interface MulterRequest extends ExpressRequest {
	file?: Express.Multer.File;
}

export const uploadExcelRequest = async (
	req: MulterRequest,
	res: Response
): Promise<Response> => {
	try {
		if (!req.file) {
			return res.status(400).json({
				status: res.statusCode,
				method: req.method,
				message: "File Excel diperlukan",
			});
		}

		// Parse Excel file
		const workbook = XLSX.readFile(req.file.path);
		const sheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[sheetName];
		const jsonData = XLSX.utils.sheet_to_json(worksheet);

		if (!jsonData || jsonData.length === 0) {
			return res.status(400).json({
				status: res.statusCode,
				method: req.method,
				message: "File Excel kosong atau tidak valid",
			});
		}

		// Debug: log first row to see actual column names
		console.log("First row from Excel:", JSON.stringify(jsonData[0], null, 2));
		// Map Excel column names to database field names
		const insertData = jsonData.map((row: any) => ({
			flag: row.Flag || "",
			sales_order: row["Sales order"] || "",
			customer: row.Customer || "",
			name: row.Name || "",
			customer_address_group: row["Customer address group"] || "",
			prices_include_sales_tax: row["Prices include sales tax"] || "",
			sales_name: row["Sales name"] || "",
			item_number: row["Item number"] || "",
			currency: row.Currency || "",
			product_name: row["Product name"] || "",
			unit: row.Unit || "",
			quantity: row.Quantity || "",
			unit_price: row["Unit price"] || "",
			discount_percent: row["Discount percent"] || "",
			deliver_remainder: row["Deliver remainder"] || "",
			remain_qty_2: row["Remain qty 2"] || "",
			remain_unit_2: row["Remain unit 2"] || "",
			sales_tax_group: row["Sales tax group"] || "",
			item_sales_tax_group: row["Item sales tax group"] || "",
			value: row.Value || "",
			value_inc_tax: row["Value inc tax"] || "",
			dimension_value: row["Dimension value"] || "",
		}));

		// Insert into database with duplicate handling
		const insertedRecords = await knex("reports")
			.insert(insertData)
			.returning("*");

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: "Data Excel berhasil diupload ke database",
			data: {
				filename: req.file.originalname,
				recordsInserted: insertedRecords.length,
				records: insertedRecords,
			},
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal mengupload dan memproses file Excel",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
