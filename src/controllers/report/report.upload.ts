import { Request as ExpressRequest, Response } from "express";
import * as XLSX from "xlsx";
import knex from "../../database";

interface MulterRequest extends ExpressRequest {
	file?: Express.Multer.File;
}

export const uploadExcelReport = async (
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
			company: row.company || "",
			sales_order: row.sales_order || "",
			po_number: row.po_number || null,
			so_date: row.so_date || null,
			invoice: row.invoice || null,
			external_invoice: row.external_invoice || "",
			invoice_date: row.invoice_date || null,
			due_date: row.due_date || null,
			invoice_account: row.invoice_account || null,
			name: row.name || null,
			address_group: row.address_group || null,
			packslip_date: row.packslip_date || null,
			packing_slip: row.packing_slip || null,
			external_packing_slip: row.external_packing_slip || null,
			sales: row.sales || null,
			item_number: row.item_number || "",
			item_name_origin: row.item_name_origin || null,
			item_name: row.item_name || null,
			group_product: row.group_product || null,
			dimensi: row.dimensi || null,
			thickness: row.thickness || null,
			length: row.length || null,
			length_m: row.length_m || null,
			color_type: row.color_type || null,
			size_width: row.size_width || "",
			qty: row.qty || "",
			unit: row.unit || "",
			qty_in_kg_ppic: row.qty_in_kg_ppic || null,
			qty_in_kg_mkt: row.qty_in_kg_mkt || null,
			divisi: row.divisi || "",
			credit_limit: row.credit_limit || null,
			cl_group: row.cl_group || null,
			price: row.price || null,
			disc_percent: row.disc_percent || null,
			disc_value: row.disc_value || null,
			line_discount: row.line_discount || null,
			header_disc: row.header_disc || null,
			total: row.total || null,
			tax_code: row.tax_code || null,
			tax: row.tax || null,
			total_and_tax: row.total_and_tax || null,
			include_tax: row.include_tax || null,
			invoicing_name_custom: row.invoicing_name_custom || "",
			group_city: row.group_city || null,
			group_county: row.group_county || null,
			group_state: row.group_state || null,
			pkp: row.pkp || null,
			npwp: row.npwp || null,
			nama: row.nama || null,
			alamat: row.alamat || null,
			kota: row.kota || null,
			propinsi: row.propinsi || null,
			sales_district_id: row.sales_district_id || null,
			district: row.district || null,
			term: row.term || "",
			pay_status: row.pay_status || "",
			closed_date: row.closed_date || null,
			note_1: row.note_1 || null,
			note_2: row.note_2 || null,
			note_3: row.note_3 || null,
		}));

		// Insert into database
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
