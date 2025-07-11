import { Request, Response } from "express";
import knex from "../../database";
import { expressValidator } from "../../utils/util.validator";

export const updateInvoice = async (
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
				message: "invoice ID diperlukan",
			});
		}

		// Cek apakah invoice exists
		const existinginvoice = await knex("salesInvoice").where({ id }).first();

		if (!existinginvoice) {
			return res.status(404).json({
				status: res.statusCode,
				method: req.method,
				message: "invoice tidak ditemukan",
			});
		}

		const invoiceData: any = {
			updated_at: new Date(),
		};

		// Add fields that can be updated
		if (req.body.invoice_account !== undefined)
			invoiceData.invoice_account = req.body.invoice_account;
		if (req.body.description !== undefined)
			invoiceData.description = req.body.description;
		if (req.body.customer_address_group !== undefined)
			invoiceData.customer_address_group = req.body.customer_address_group;
		if (req.body.customer_credit_limit_group !== undefined)
			invoiceData.customer_credit_limit_group =
				req.body.customer_credit_limit_group;
		if (req.body.sales_order !== undefined)
			invoiceData.sales_order = req.body.sales_order;
		if (req.body.sales_responsible !== undefined)
			invoiceData.sales_responsible = req.body.sales_responsible;
		if (req.body.currency !== undefined)
			invoiceData.currency = req.body.currency;
		if (req.body.payment !== undefined) invoiceData.payment = req.body.payment;
		if (req.body.packing_slip !== undefined)
			invoiceData.packing_slip = req.body.packing_slip;
		if (req.body.external_packing_slid !== undefined)
			invoiceData.external_packing_slid = req.body.external_packing_slid;
		if (req.body.date !== undefined) invoiceData.date = req.body.date;
		if (req.body.delivery_name !== undefined)
			invoiceData.delivery_name = req.body.delivery_name;
		if (req.body.note !== undefined) invoiceData.note = req.body.note;
		if (req.body.item_number !== undefined)
			invoiceData.item_number = req.body.item_number;
		if (req.body.product_name !== undefined)
			invoiceData.product_name = req.body.product_name;
		if (req.body.delivered !== undefined)
			invoiceData.delivered = req.body.delivered;
		if (req.body.unit !== undefined) invoiceData.unit = req.body.unit;
		if (req.body.delivered_2 !== undefined)
			invoiceData.delivered_2 = req.body.delivered_2;
		if (req.body.unit_2 !== undefined) invoiceData.unit_2 = req.body.unit_2;
		if (req.body.unit_price !== undefined)
			invoiceData.unit_price = req.body.unit_price;
		if (req.body.discount_percent !== undefined)
			invoiceData.discount_percent = req.body.discount_percent;
		if (req.body.total_discount_percent !== undefined)
			invoiceData.total_discount_percent = req.body.total_discount_percent;
		if (req.body.amount !== undefined) invoiceData.amount = req.body.amount;
		if (req.body.tax_amount !== undefined)
			invoiceData.tax_amount = req.body.tax_amount;
		if (req.body.prices_include_sales_tax !== undefined)
			invoiceData.prices_include_sales_tax = req.body.prices_include_sales_tax;
		if (req.body.amount_exc_tax !== undefined)
			invoiceData.amount_exc_tax = req.body.amount_exc_tax;
		if (req.body.amount_inc_tax !== undefined)
			invoiceData.amount_inc_tax = req.body.amount_inc_tax;
		if (req.body.value !== undefined) invoiceData.value = req.body.value;
		if (req.body.div !== undefined) invoiceData.div = req.body.div;

		const updateResult = await knex("salesInvoice")
			.where({ id })
			.update(invoiceData);

		if (updateResult === 0) {
			return res.status(408).json({
				status: res.statusCode,
				method: req.method,
				message: "Gagal mengupdate invoice, server sibuk",
			});
		}

		// Get updated invoice
		const updatedinvoice = await knex("salesInvoice").where({ id }).first();

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: "invoice berhasil diupdate",
			data: updatedinvoice,
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal mengupdate invoice",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
