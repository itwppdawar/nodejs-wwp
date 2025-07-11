import { Request, Response } from "express";
import knex from "../../database";
import { expressValidator } from "../../utils/util.validator";

export const updateSq = async (
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
				message: "Sales Quotation ID diperlukan",
			});
		}

		const existingSq = await knex("sqs").where({ id }).first();

		if (!existingSq) {
			return res.status(404).json({
				status: res.statusCode,
				method: req.method,
				message: "Sales Quotation tidak ditemukan",
			});
		}

		const SqData: any = {
			updated_at: new Date(),
		};

		if (req.body.quotation !== undefined) SqData.quotation = req.body.quotation;
		if (req.body.created_date_and_time !== undefined)
			SqData.created_date_and_time = req.body.created_date_and_time;
		if (req.body.invoice_account !== undefined)
			SqData.invoice_account = req.body.invoice_account;
		if (req.body.name !== undefined) SqData.name = req.body.name;
		if (req.body.prospect !== undefined) SqData.prospect = req.body.prospect;
		if (req.body.customer_address_group !== undefined)
			SqData.customer_address_group = req.body.customer_address_group;
		if (req.body.quotation_status !== undefined)
			SqData.quotation_status = req.body.quotation_status;
		if (req.body.delivery_name !== undefined)
			SqData.delivery_name = req.body.delivery_name;
		if (req.body.item_number !== undefined)
			SqData.item_number = req.body.item_number;
		if (req.body.product_name !== undefined)
			SqData.product_name = req.body.product_name;
		if (req.body.search_name !== undefined)
			SqData.search_name = req.body.search_name;
		if (req.body.site !== undefined) SqData.site = req.body.site;
		if (req.body.warehouse !== undefined) SqData.warehouse = req.body.warehouse;
		if (req.body.sales_taker !== undefined)
			SqData.sales_taker = req.body.sales_taker;
		if (req.body.sales_responsible !== undefined)
			SqData.sales_responsible = req.body.sales_responsible;
		if (req.body.quantity !== undefined) SqData.quantity = req.body.quantity;
		if (req.body.unit_price !== undefined)
			SqData.unit_price = req.body.unit_price;
		if (req.body.discount_percent !== undefined)
			SqData.discount_percent = req.body.discount_percent;
		if (req.body.discount !== undefined) SqData.discount = req.body.discount;
		if (req.body.net_amount !== undefined)
			SqData.net_amount = req.body.net_amount;
		if (req.body.dimension_value !== undefined)
			SqData.dimension_value = req.body.dimension_value;
		if (req.body.note_1 !== undefined) SqData.note_1 = req.body.note_1;
		if (req.body.note_2 !== undefined) SqData.note_2 = req.body.note_2;
		if (req.body.note_3 !== undefined) SqData.note_3 = req.body.note_3;

		const updateResult = await knex("sqs").where({ id }).update(SqData);

		if (updateResult === 0) {
			return res.status(408).json({
				status: res.statusCode,
				method: req.method,
				message: "Gagal mengupdate Sales Quotation, server sibuk",
			});
		}

		const updatedSq = await knex("sqs").where({ id }).first();

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: "Sales Quotation berhasil diupdate",
			data: updatedSq,
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal mengupdate Sales Quotation",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
