import { Request as ExpressRequest, Response } from "express";
import * as XLSX from "xlsx";
import knex from "../../database";

interface MulterRequest extends ExpressRequest {
	file?: Express.Multer.File;
}

export const uploadExcelSq = async (
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
			quotation: row.quotation || "",
			created_date_and_time: row["Created Date and Time"]
				? new Date(row["Created Date and Time"])
				: null,
			invoice_account: row["Invoice Account"] || "",
			name: row.name || "",
			prospect: row.prospect || "",
			customer_address_group: row["Customer Address Group"] || "",
			quotation_status: row["Quotation Status"] || "",
			delivery_name: row["Delivery Name"] || "",
			item_number: row["Item Number"] || "",
			product_name: row["Product Name"] || "",
			search_name: row["Search Name"] || "",
			site: row.site || "",
			warehouse: row.warehouse || "",
			sales_taker: row["Sales Taker"] || "",
			sales_responsible: row["Sales Responsible"] || "",
			quantity: row.quantity || "",
			unit_price: row["Unit Price"] || "",
			discount_percent: row["Discount Percent"] || "",
			discount: row.discount || "",
			net_amount: row["Net Amount"] || "",
			dimension_value: row["Dimension Value"] || "",
			note_1: row["Note 1"] || "",
			note_2: row["Note 2"] || "",
			note_3: row["Note 3"] || "",
		}));

		// Insert into database
		const insertedRecords = await knex("sqs").insert(insertData).returning("*");

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
