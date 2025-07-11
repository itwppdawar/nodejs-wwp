import { Request as ExpressRequest, Response } from "express";
import * as XLSX from "xlsx";
import knex from "../../database";

interface MulterRequest extends ExpressRequest {
	file?: Express.Multer.File;
}

export const uploadExcelSo = async (
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

		// Insert data to database
		const insertData = jsonData.map((row: any) => ({
			flag: row.flag || "",
			sales_order: row["Sales Order"] || "",
			customer: row.customer || "",
			name: row.name || "",
			customer_address_group: row["Customer Address_Group"] || "",
			prices_include_sales_tax: row["Prices Include Sales Tax"] || "",
			sales_name: row["Sales Name"] || "",
			item_number: row["Item Number"] || "",
			currency: row.currency || "",
			product_name: row["Product Name"] || "",
			unit: row.unit || "",
			quantity: row.quantity || "",
			unit_price: row["Unit Price"] || "",
			discount_percent: row["Discount Percent"] || "",
			deliver_remainder: row["Deliver Remainder"] || "",
			remain_qty_2: row["Remain Qty 2"] || "",
			remain_unit_2: row["Remain Unit 2"] || "",
			sales_tax_group: row["Sales Tax Group"] || "",
			item_sales_tax_group: row["Sales Tax Group"] || "",
			value: row.value || "",
			value_inc_tax: row["Value Inc Tax"] || "",
			dimension_value: row["Dimension Value"] || "",
		}));

		// Insert into database
		const insertedRecords = await knex("so").insert(insertData).returning("*");
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
