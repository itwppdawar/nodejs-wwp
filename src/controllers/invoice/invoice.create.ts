import { Request, Response } from "express";
import knex from "../../database";
import { expressValidator } from "../../utils/util.validator";

export const createInvoice = async (
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
		const invoiceData = {
			invoice_account: req.body.invoice_account,
			description: req.body.description,
			customer_address_group: req.body.customer_address_group,
			customer_credit_limit_group: req.body.customer_credit_limit_group,
			sales_order: req.body.sales_order,
			sales_responsible: req.body.sales_responsible,
			currency: req.body.currency,
			payment: req.body.payment,
			packing_slip: req.body.packing_slip,
			external_packing_slid: req.body.external_packing_slid,
			date: req.body.date,
			delivery_name: req.body.delivery_name,
			note: req.body.note,
			item_number: req.body.item_number,
			product_name: req.body.product_name,
			delivered: req.body.delivered,
			unit: req.body.unit,
			delivered_2: req.body.delivered_2,
			unit_2: req.body.unit_2,
			unit_price: req.body.unit_price,
			discount_percent: req.body.discount_percent,
			total_discount_percent: req.body.total_discount_percent,
			amount: req.body.amount,
			tax_amount: req.body.tax_amount,
			prices_include_sales_tax: req.body.prices_include_sales_tax,
			amount_exc_tax: req.body.amount_exc_tax,
			amount_inc_tax: req.body.amount_inc_tax,
			value: req.body.value,
			div: req.body.div,
		};

		const [salesinvoice] = await knex("salesInvoice")
			.insert(invoiceData)
			.returning("*");

		return res.status(201).json({
			status: res.statusCode,
			method: req.method,
			message: "salesinvoice berhasil dibuat",
			data: salesinvoice,
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal membuat salesinvoice",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
