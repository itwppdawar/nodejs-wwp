import { Request, Response } from "express";
import knex from "../../database";
import { expressValidator } from "../../utils/util.validator";

export const createSq = async (
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
		// Extract data from So body
		const salesQoutation = {
			quotation: req.body.quotation || null,
			created_date_and_time: req.body.created_date_and_time || null,
			invoice_account: req.body.invoice_account || null,
			name: req.body.name || null,
			prospect: req.body.prospect || null,
			customer_address_group: req.body.customer_address_group || null,
			quotation_status: req.body.quotation_status || null,
			delivery_name: req.body.delivery_name,
			item_number: req.body.item_number,
			product_name: req.body.product_name || null,
			search_name: req.body.search_name || null,
			site: req.body.site || null,
			warehouse: req.body.warehouse || null,
			sales_taker: req.body.sales_taker || null,
			sales_responsible: req.body.sales_responsible || null,
			quantity: req.body.quantity || null,
			unit_price: req.body.unit_price || null,
			discount_percent: req.body.discount_percent || null,
			discount: req.body.discount || null,
			net_amount: req.body.net_amount || null,
			dimension_value: req.body.dimension_value || null,
			note_1: req.body.note_1 || null,
			note_2: req.body.note_2 || null,
			note_3: req.body.note_3 || null,
		};

		const [salesQoutations] = await knex("sqs")
			.insert(salesQoutation)
			.returning("*");

		return res.status(201).json({
			status: res.statusCode,
			method: req.method,
			message: "Sales Qoutation berhasil dibuat",
			data: salesQoutations,
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal membuat Sales Qoutation",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
