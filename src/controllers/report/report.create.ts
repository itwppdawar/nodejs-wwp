import { Request, Response } from "express";
import knex from "../../database";
import { expressValidator } from "../../utils/util.validator";
import {
	SalesReportDTO,
	ItemReportDTO,
	PriceReportDTO,
	DivisionReportDTO,
	CustomerReportDTO,
} from "../../dto/dto.report";

interface CreateReportRequest {
	// Sales Report fields
	company: string;
	sales_order: string;
	po_number?: string;
	so_date?: string;
	invoice?: string;
	external_invoice: string;
	invoice_date?: Date;
	due_date?: Date;
	invoice_account?: string;
	name?: string;
	address_group?: string;
	packslip_date?: Date;
	packing_slip?: string;
	external_packing_slip?: string;
	sales?: string;

	// Items array
	items: Array<{
		item_number: string;
		item_name_origin?: string;
		item_name?: string;
		group_product?: string;
		thickness?: string;
		length?: string;
		length_m?: string;
		color_type: string;
		size_width: string;
		qty: number;
		unit: string;
		qty_in_kg_ppic?: string;
		qty_in_kg_mkt?: string;
	}>;

	price: Array<{
		price: number;
		disc_percent?: number;
		disc_value?: number;
		line_discount: number;
		header_disc?: number;
		total?: number;
		tax_code: string;
		tax?: number;
		total_and_tax?: number;
		include_tax?: number;
	}>;

	division: Array<{
		divisi: string;
		credit_limit?: string;
		cl_group?: string;
	}>;

	customer: Array<{
		invoicing_name_custom: string;
		group_city?: string;
		group_county?: string;
		group_state?: string;
		credit_limit?: string;
		cl_group?: string;
	}>;
}

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
	const requestBody: CreateReportRequest = req.body;

	if (
		!requestBody.company ||
		!requestBody.sales_order ||
		!requestBody.external_invoice
	) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: "Company, sales_order, dan external_invoice wajib diisi",
		});
	}

	if (
		!requestBody.items ||
		!Array.isArray(requestBody.items) ||
		requestBody.items.length === 0
	) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: "Items harus berupa array dan tidak boleh kosong",
		});
	}

	if (
		!requestBody.price ||
		!Array.isArray(requestBody.price) ||
		requestBody.items.length === 0
	) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: "Price harus berupa array dan tidak boleh kosong",
		});
	}

	if (
		!requestBody.division ||
		!Array.isArray(requestBody.division) ||
		requestBody.items.length === 0
	) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: "Division harus berupa array dan tidak boleh kosong",
		});
	}

	if (
		!requestBody.customer ||
		!Array.isArray(requestBody.customer) ||
		requestBody.items.length === 0
	) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: "Customer harus berupa array dan tidak boleh kosong",
		});
	}

	return await knex.transaction(async (trx) => {
		try {
			const salesReportData: Partial<SalesReportDTO> = {
				company: requestBody.company,
				sales_order: requestBody.sales_order,
				po_number: requestBody.po_number || null,
				so_date: requestBody.so_date || null,
				invoice: requestBody.invoice || null,
				external_invoice: requestBody.external_invoice,
				invoice_date: requestBody.invoice_date || null,
				due_date: requestBody.due_date || null,
				invoice_account: requestBody.invoice_account || null,
				name: requestBody.name || null,
				address_group: requestBody.address_group || null,
				packslip_date: requestBody.packslip_date || null,
				packing_slip: requestBody.packing_slip || null,
				external_packing_slip: requestBody.external_packing_slip || null,
				sales: requestBody.sales || null,
				created_at: new Date(),
				updated_at: new Date(),
			};

			const [salesReport] = await trx("salesReport")
				.insert(salesReportData)
				.returning("*");

			if (!salesReport) {
				throw new Error("Gagal membuat sales report");
			}

			for (let i = 0; i < requestBody.items.length; i++) {
				const item = requestBody.items[i];
				const price = requestBody.price[i];
				const division = requestBody.division[i];
				const customer = requestBody.customer[i];

				if (
					!item.item_number ||
					!item.color_type ||
					!item.size_width ||
					item.qty === undefined ||
					!item.unit
				) {
					throw new Error(
						`Item dengan item_number ${item.item_number} memiliki data yang tidak lengkap`
					);
				}

				const itemReportData: Partial<ItemReportDTO> = {
					sales_id: salesReport.id,
					item_number: item.item_number,
					item_name_origin: item.item_name_origin || null,
					item_name: item.item_name || null,
					group_product: item.group_product || null,
					thickness: item.thickness || null,
					length: item.length || null,
					length_m: item.length_m || null,
					color_type: item.color_type,
					size_width: item.size_width,
					qty: item.qty,
					unit: item.unit,
					qty_in_kg_ppic: item.qty_in_kg_ppic || null,
					qty_in_kg_mkt: item.qty_in_kg_mkt || null,
					created_at: new Date(),
					updated_at: new Date(),
				};

				const [itemReport] = await trx("itemReport")
					.insert(itemReportData)
					.returning("*");

				if (!itemReport) {
					throw new Error(
						`Gagal membuat item report untuk ${item.item_number}`
					);
				}

				if (!price) {
					throw new Error(
						`Data price untuk item dengan item_number ${item.item_number} tidak ditemukan`
					);
				}
				const priceReportData: Partial<PriceReportDTO> = {
					item_id: itemReport.id,
					price: price.price,
					disc_percent: price.disc_percent || null,
					disc_value: price.disc_value || null,
					line_discount: price.line_discount || null,
					header_disc: price.header_disc || null,
					total: price.total || null,
					tax_code: price.tax_code || null,
					tax: price.tax,
					total_and_tax: price.total_and_tax,
					include_tax: price.include_tax,
					created_at: new Date(),
					updated_at: new Date(),
				};

				await trx("priceReport").insert(priceReportData);

				if (!division) {
					throw new Error(
						`Data division untuk item dengan item_number ${item.item_number} tidak ditemukan`
					);
				}
				const divisionReportData: Partial<DivisionReportDTO> = {
					item_id: itemReport.id,
					divisi: division.divisi,
					credit_limit: division.credit_limit || null,
					cl_group: division.cl_group || null,
					created_at: new Date(),
					updated_at: new Date(),
				};

				const [divisionReport] = await trx("DivisionReport")
					.insert(divisionReportData)
					.returning("*");

				await trx("divisionReport").insert(divisionReportData);

				if (!division) {
					throw new Error(
						`Data division untuk item dengan item_number ${item.item_number} tidak ditemukan`
					);
				}

				const customerReportData: Partial<CustomerReportDTO> = {
					division_id: divisionReport.id,
					invoicing_name_custom: customer.invoicing_name_custom,
					group_city: customer.group_city || null,
					group_county: customer.group_county || null,
					group_state: customer.group_state || null,
					credit_limit: customer.credit_limit || null,
					cl_group: customer.cl_group || null,
					created_at: new Date(),
					updated_at: new Date(),
				};

				await trx("customerReport").insert(customerReportData);

				if (!customer) {
					throw new Error(
						`Data customer untuk division dengan division_divisi ${division.divisi} tidak ditemukan`
					);
				}
			}

			await trx.commit();

			return res.status(201).json({
				status: res.statusCode,
				method: req.method,
				message: "Report berhasil dibuat",
				data: {
					sales_report_id: salesReport.id,
					items_count: requestBody.items.length,
				},
			});
		} catch (error) {
			await trx.rollback();

			return res.status(500).json({
				status: res.statusCode,
				method: req.method,
				message: "Gagal membuat report",
				error: error instanceof Error ? error.message : "Unknown error",
			});
		}
	});
};
