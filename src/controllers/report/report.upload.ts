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
			sales_order: row["Sales Order"] || "",
			po_number: row["Po Number"] || null,
			so_date: row["So Date"] || null,
			invoice: row.invoice || null,
			external_invoice: row["External Invoice"] || "",
			invoice_date: row["Invoice Date"] || null,
			due_date: row["Due Date"] || null,
			invoice_account: row["Invoice Account"] || null,
			name: row.name || null,
			address_group: row["Address Group"] || null,
			packslip_date: row["Packslip Date"] || null,
			packing_slip: row["Packslip Slip"] || null,
			external_packing_slip: row["External Packing Slip"] || null,
			sales: row.sales || null,
			item_number: row["Item Number"] || "",
			item_name_origin: row["Item Name Origin"] || null,
			item_name: row["Item Name"] || null,
			group_product: row["Group Product"] || null,
			dimensi: row.dimensi || null,
			thickness: row.thickness || null,
			length: row.length || null,
			length_m: row["Length M"] || null,
			color_type: row["Color Type"] || null,
			size_width: row["Size Width"] || "",
			qty: row.qty || "",
			unit: row.unit || "",
			qty_in_kg_ppic: row["Qty In Kg Ppic"] || null,
			qty_in_kg_mkt: row["Qty In Kg Mkt"] || null,
			divisi: row.divisi || "",
			credit_limit: row["Credit Limit"] || null,
			cl_group: row["Cl Group"] || null,
			price: row.price || null,
			disc_percent: row["Disc Percent"] || null,
			disc_value: row["Disc Value"] || null,
			line_discount: row["Line Discount"] || null,
			header_disc: row["Header Disc"] || null,
			total: row.total || null,
			tax_code: row["Tax Code"] || null,
			tax: row.tax || null,
			total_and_tax: row["Total And Tax"] || null,
			include_tax: row["Include Tax"] || null,
			invoicing_name_custom: row["Invoicing Name Custom"] || "",
			group_city: row["Group City"] || null,
			group_county: row["Group Country"] || null,
			group_state: row["Group State"] || null,
			pkp: row.pkp || null,
			npwp: row.npwp || null,
			nama: row.nama || null,
			alamat: row.alamat || null,
			kota: row.kota || null,
			propinsi: row.propinsi || null,
			sales_district_id: row["Sales District Id"] || null,
			district: row.district || null,
			term: row.term || "",
			pay_status: row["Pay Status"] || "",
			closed_date: row["Closed Date"] || null,
			note_1: row["Note 1"] || null,
			note_2: row["Note 2"] || null,
			note_3: row["Note 3"] || null,
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
