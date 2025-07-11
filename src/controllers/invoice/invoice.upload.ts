import { Request as ExpressRequest, Response } from "express";
import * as XLSX from "xlsx";
import knex from "../../database";

interface MulterRequest extends ExpressRequest {
	file?: Express.Multer.File;
}

export const uploadExcelInvoice = async (
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
			invoice_account: row["Invoice Account"] || "",
			description: row.description || "",
			customer_address_group: row["Customer Address Group"] || "",
			customer_credit_limit_group: row["Credit Limit Group"] || "",
			sales_order: row["Sales Order"] || "",
			sales_responsible: row["Sales Responsible"] || "",
			currency: row.currency || "",
			payment: row.payment || "",
			packing_slip: row["Packing Slip"] || "",
			external_packing_slip: row["External Packing Slip"] || "",
			date: row.date ? new Date(row.date) : null,
			delivery_name: row["Delivery Name"] || "",
			note: row.note || "",
			item_number: row["Item Number"] || "",
			product_name: row["Product Name"] || "",
			delivered: row.delivered || "",
			unit: row.unit || "",
			delivered_2: row["Delivered 2"] || "",
			unit_2: row["Unit 2"] || "",
			unit_price: row["Unit Price"] || "",
			discount_percent: row["Discount Percent"] || "",
			total_discount_percent: row["Total Discount Percent"] || "",
			amount: row.amount || "",
			tax_amount: row["Tax Amount"] || "",
			prices_include_sales_tax: row["Prices Include Sales Tax"] || "",
			amount_exc_tax: row["Amount exc Tax"] || "",
			amount_inc_tax: row["Amount Inc Tax"] || "",
			value: row.value || "",
			div: row.div || "",
		}));

		// Insert into database
		const insertedRecords = await knex("salesInvoice")
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
