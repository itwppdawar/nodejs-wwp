import { Request, Response } from "express";
import knex from "../../database";
import { expressValidator } from "../../utils/util.validator";

export const updateReport = async (
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
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				status: res.statusCode,
				method: req.method,
				message: "Report ID diperlukan",
			});
		}

		// Cek apakah report exists
		const existingReport = await knex("reports").where({ id }).first();

		if (!existingReport) {
			return res.status(404).json({
				status: res.statusCode,
				method: req.method,
				message: "Report tidak ditemukan",
			});
		}

		// Extract data from request body - only update fields that are provided
		const reportData: any = {
			updated_at: new Date(),
		};

		// Only update fields that are provided in the request
		if (req.body.company !== undefined) reportData.company = req.body.company;
		if (req.body.sales_order !== undefined)
			reportData.sales_order = req.body.sales_order || null;
		if (req.body.po_number !== undefined)
			reportData.po_number = req.body.po_number || null;
		if (req.body.so_date !== undefined)
			reportData.so_date = req.body.so_date || null;
		if (req.body.invoice !== undefined)
			reportData.invoice = req.body.invoice || null;
		if (req.body.external_invoice !== undefined)
			reportData.external_invoice = req.body.external_invoice;
		if (req.body.invoice_date !== undefined)
			reportData.invoice_date = req.body.invoice_date || null;
		if (req.body.due_date !== undefined)
			reportData.due_date = req.body.due_date || null;
		if (req.body.invoice_account !== undefined)
			reportData.invoice_account = req.body.invoice_account || null;
		if (req.body.name !== undefined) reportData.name = req.body.name || null;
		if (req.body.address_group !== undefined)
			reportData.address_group = req.body.address_group || null;
		if (req.body.packslip_date !== undefined)
			reportData.packslip_date = req.body.packslip_date || null;
		if (req.body.packing_slip !== undefined)
			reportData.packing_slip = req.body.packing_slip || null;
		if (req.body.external_packing_slip !== undefined)
			reportData.external_packing_slip = req.body.external_packing_slip || null;
		if (req.body.sales !== undefined) reportData.sales = req.body.sales || null;
		if (req.body.item_number !== undefined)
			reportData.item_number = req.body.item_number;
		if (req.body.item_name_origin !== undefined)
			reportData.item_name_origin = req.body.item_name_origin || null;
		if (req.body.item_name !== undefined)
			reportData.item_name = req.body.item_name || null;
		if (req.body.group_product !== undefined)
			reportData.group_product = req.body.group_product || null;
		if (req.body.thickness !== undefined)
			reportData.thickness = req.body.thickness || null;
		if (req.body.length !== undefined)
			reportData.length = req.body.length || null;
		if (req.body.length_m !== undefined)
			reportData.length_m = req.body.length_m || null;
		if (req.body.color_type !== undefined)
			reportData.color_type = req.body.color_type || null;
		if (req.body.size_width !== undefined)
			reportData.size_width = req.body.size_width;
		if (req.body.qty !== undefined) reportData.qty = req.body.qty;
		if (req.body.unit !== undefined) reportData.unit = req.body.unit;
		if (req.body.qty_in_kg_ppic !== undefined)
			reportData.qty_in_kg_ppic = req.body.qty_in_kg_ppic || null;
		if (req.body.qty_in_kg_mkt !== undefined)
			reportData.qty_in_kg_mkt = req.body.qty_in_kg_mkt || null;
		if (req.body.divisi !== undefined) reportData.divisi = req.body.divisi;
		if (req.body.credit_limit !== undefined)
			reportData.credit_limit = req.body.credit_limit || null;
		if (req.body.cl_group !== undefined)
			reportData.cl_group = req.body.cl_group || null;
		if (req.body.price !== undefined) reportData.price = req.body.price || null;
		if (req.body.disc_percent !== undefined)
			reportData.disc_percent = req.body.disc_percent || null;
		if (req.body.disc_value !== undefined)
			reportData.disc_value = req.body.disc_value || null;
		if (req.body.line_discount !== undefined)
			reportData.line_discount = req.body.line_discount || null;
		if (req.body.header_disc !== undefined)
			reportData.header_disc = req.body.header_disc || null;
		if (req.body.total !== undefined) reportData.total = req.body.total || null;
		if (req.body.tax_code !== undefined)
			reportData.tax_code = req.body.tax_code || null;
		if (req.body.tax !== undefined) reportData.tax = req.body.tax || null;
		if (req.body.total_and_tax !== undefined)
			reportData.total_and_tax = req.body.total_and_tax || null;
		if (req.body.include_tax !== undefined)
			reportData.include_tax = req.body.include_tax || null;
		if (req.body.invoicing_name_custom !== undefined)
			reportData.invoicing_name_custom = req.body.invoicing_name_custom;
		if (req.body.group_city !== undefined)
			reportData.group_city = req.body.group_city || null;
		if (req.body.group_county !== undefined)
			reportData.group_county = req.body.group_county || null;
		if (req.body.group_state !== undefined)
			reportData.group_state = req.body.group_state || null;
		if (req.body.pkp !== undefined) reportData.pkp = req.body.pkp || null;
		if (req.body.npwp !== undefined) reportData.npwp = req.body.npwp || null;
		if (req.body.nama !== undefined) reportData.nama = req.body.nama || null;
		if (req.body.alamat !== undefined)
			reportData.alamat = req.body.alamat || null;
		if (req.body.kota !== undefined) reportData.kota = req.body.kota || null;
		if (req.body.propinsi !== undefined)
			reportData.propinsi = req.body.propinsi || null;
		if (req.body.sales_district_id !== undefined)
			reportData.sales_district_id = req.body.sales_district_id || null;
		if (req.body.district !== undefined)
			reportData.district = req.body.district || null;
		if (req.body.term !== undefined) reportData.term = req.body.term;
		if (req.body.pay_status !== undefined)
			reportData.pay_status = req.body.pay_status;
		if (req.body.closed_date !== undefined)
			reportData.closed_date = req.body.closed_date || null;
		if (req.body.note_1 !== undefined)
			reportData.note_1 = req.body.note_1 || null;
		if (req.body.note_2 !== undefined)
			reportData.note_2 = req.body.note_2 || null;
		if (req.body.note_3 !== undefined)
			reportData.note_3 = req.body.note_3 || null;

		// Update report
		const updateResult = await knex("reports").where({ id }).update(reportData);

		if (updateResult === 0) {
			return res.status(408).json({
				status: res.statusCode,
				method: req.method,
				message: "Gagal mengupdate report, server sibuk",
			});
		}

		// Get updated report
		const updatedReport = await knex("reports").where({ id }).first();

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: "Report berhasil diupdate",
			data: updatedReport,
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal mengupdate report",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
