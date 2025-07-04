import { Request, Response } from "express";
import knex from "../../database";

// Fungsi untuk mendapatkan detail report lengkap (semua tabel)
export const detailReport = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	try {
		const { salesOrderId } = req.params;

		if (!salesOrderId) {
			return res.status(400).json({
				status: res.statusCode,
				method: req.method,
				message: "Sales Order ID diperlukan",
			});
		}

		// Ambil data sales berdasarkan sales_order
		const salesReport = await knex("salesReport")
			.where({ sales_order: salesOrderId })
			.first();

		if (!salesReport) {
			return res.status(404).json({
				status: res.statusCode,
				method: req.method,
				message: "Report tidak ditemukan",
			});
		}

		// Ambil data items dan relasi lainnya
		const result = await knex
			.select(
				// Sales report columns
				"sr.id as sales_report_id",
				"sr.company",
				"sr.sales_order",
				"sr.po_number",
				"sr.so_date",
				"sr.invoice",
				"sr.external_invoice",
				"sr.invoice_date",
				"sr.due_date",
				"sr.invoice_account",
				"sr.name as customer_name",
				"sr.address_group",
				"sr.packslip_date",
				"sr.packing_slip",
				"sr.external_packing_slip",
				// Item report columns
				"ir.id as item_id",
				"ir.item_number",
				"ir.item_name_origin",
				"ir.item_name",
				"ir.group_product",
				"ir.thickness",
				"ir.length",
				"ir.length_m",
				"ir.color_type",
				"ir.size_width",
				"ir.qty",
				"ir.unit",
				"ir.qty_in_kg_ppic",
				"ir.qty_in_kg_mkt",
				// Price report columns
				"pr.id as price_id",
				"pr.price",
				"pr.disc_percent",
				"pr.disc_value",
				"pr.line_discount",
				"pr.header_disc",
				"pr.total",
				"pr.tax_code",
				"pr.tax",
				"pr.total_and_tax",
				"pr.include_tax",
				// Division report columns
				"dr.id as division_id",
				"dr.divisi",
				"dr.credit_limit as division_credit_limit",
				"dr.cl_group as division_cl_group",
				// Customer report columns
				"cr.id as customer_id",
				"cr.invoicing_name_custom",
				"cr.group_city",
				"cr.group_county",
				"cr.group_state",
				"cr.credit_limit as customer_credit_limit",
				"cr.cl_group as customer_cl_group"
			)
			.from("salesReport as sr")
			.leftJoin("itemReport as ir", "sr.id", "ir.sales_id")
			.leftJoin("priceReport as pr", "ir.id", "pr.item_id")
			.leftJoin("divisionReport as dr", "ir.id", "dr.item_id")
			.leftJoin("customerReport as cr", "dr.id", "cr.division_id")
			.where("sr.id", salesReport.id);

		// Restruktur data untuk format yang lebih mudah dibaca
		const formattedData = {
			sales: {
				id: salesReport.id,
				company: salesReport.company,
				sales_order: salesReport.sales_order,
				po_number: salesReport.po_number,
				so_date: salesReport.so_date,
				invoice: salesReport.invoice,
				external_invoice: salesReport.external_invoice,
				invoice_date: salesReport.invoice_date,
				due_date: salesReport.due_date,
				invoice_account: salesReport.invoice_account,
				name: salesReport.name,
				address_group: salesReport.address_group,
				packslip_date: salesReport.packslip_date,
				packing_slip: salesReport.packing_slip,
				external_packing_slip: salesReport.external_packing_slip,
				created_at: salesReport.created_at,
				updated_at: salesReport.updated_at,
			},
			items: [],
		};

		// Struktur data items dengan price, division, dan customer
		const itemMap = new Map();

		result.forEach((row) => {
			if (!row.item_id) return;

			if (!itemMap.has(row.item_id)) {
				itemMap.set(row.item_id, {
					id: row.item_id,
					item_number: row.item_number,
					item_name_origin: row.item_name_origin,
					item_name: row.item_name,
					group_product: row.group_product,
					thickness: row.thickness,
					length: row.length,
					length_m: row.length_m,
					color_type: row.color_type,
					size_width: row.size_width,
					qty: row.qty,
					unit: row.unit,
					qty_in_kg_ppic: row.qty_in_kg_ppic,
					qty_in_kg_mkt: row.qty_in_kg_mkt,
					price: {
						id: row.price_id,
						price: row.price,
						disc_percent: row.disc_percent,
						disc_value: row.disc_value,
						line_discount: row.line_discount,
						header_disc: row.header_disc,
						total: row.total,
						tax_code: row.tax_code,
						tax: row.tax,
						total_and_tax: row.total_and_tax,
						include_tax: row.include_tax,
					},
					division: {
						id: row.division_id,
						divisi: row.divisi,
						credit_limit: row.division_credit_limit,
						cl_group: row.division_cl_group,
						customer: {
							id: row.customer_id,
							invoicing_name_custom: row.invoicing_name_custom,
							group_city: row.group_city,
							group_county: row.group_county,
							group_state: row.group_state,
							credit_limit: row.customer_credit_limit,
							cl_group: row.customer_cl_group,
						},
					},
				});
			}
		});

		formattedData.items = Array.from(itemMap.values());

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: "Detail report berhasil diambil",
			data: formattedData,
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal mengambil detail report",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
