import { Request, Response } from "express";
import knex from "../../database";
import { expressValidator } from "../../utils/util.validator";

export const createReport = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	const errors = expressValidator(req);

	if (errors.length > 0) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			errors,
		});
	}

	try {
		// Extract data from request body
		const reportData = {
			company: req.body.company,
			sales_order: req.body.sales_order || null,
			po_number: req.body.po_number || null,
			so_date: req.body.so_date || null,
			invoice: req.body.invoice || null,
			external_invoice: req.body.external_invoice,
			invoice_date: req.body.invoice_date || null,
			due_date: req.body.due_date || null,
			invoice_account: req.body.invoice_account || null,
			name: req.body.name || null,
			address_group: req.body.address_group || null,
			packslip_date: req.body.packslip_date || null,
			packing_slip: req.body.packing_slip || null,
			external_packing_slip: req.body.external_packing_slip || null,
			sales: req.body.sales || null,
			item_number: req.body.item_number,
			item_name_origin: req.body.item_name_origin || null,
			item_name: req.body.item_name || null,
			group_product: req.body.group_product || null,
			thickness: req.body.thickness || null,
			length: req.body.length || null,
			length_m: req.body.length_m || null,
			color_type: req.body.color_type || null,
			size_width: req.body.size_width,
			qty: req.body.qty || null,
			unit: req.body.unit,
			qty_in_kg_ppic: req.body.qty_in_kg_ppic || null,
			qty_in_kg_mkt: req.body.qty_in_kg_mkt || null,
			divisi: req.body.divisi,
			credit_limit: req.body.credit_limit || null,
			cl_group: req.body.cl_group || null,
			price: req.body.price ? req.body.price : null,
			disc_percent: req.body.disc_percent ? req.body.disc_percent : null,
			disc_value: req.body.disc_value ? req.body.disc_value : null,
			line_discount: req.body.line_discount ? req.body.line_discount : null,
			header_disc: req.body.header_disc ? req.body.header_disc : null,
			total: req.body.total ? req.body.total : null,
			tax_code: req.body.tax_code || null,
			tax: req.body.tax ? req.body.tax : null,
			total_and_tax: req.body.total_and_tax ? req.body.total_and_tax : null,
			include_tax: req.body.include_tax ? req.body.total_and_tax : null,
			invoicing_name_custom: req.body.invoicing_name_custom,
			group_city: req.body.group_city || null,
			group_county: req.body.group_county || null,
			group_state: req.body.group_state || null,
			pkp: req.body.pkp || null,
			npwp: req.body.npwp || null,
			nama: req.body.nama || null,
			alamat: req.body.alamat || null,
			kota: req.body.kota || null,
			propinsi: req.body.propinsi || null,
			sales_district_id: req.body.sales_district_id || null,
			district: req.body.district || null,
			term: req.body.term,
			pay_status: req.body.pay_status,
			closed_date: req.body.closed_date || null,
			note_1: req.body.note_1 || null,
			note_2: req.body.note_2 || null,
			note_3: req.body.note_3 || null,
		};

		// Insert the report into the database
		const [report] = await knex("reports").insert(reportData).returning("*");

		return res.status(201).json({
			status: res.statusCode,
			method: req.method,
			message: "Report berhasil dibuat",
			data: report,
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal membuat report",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
