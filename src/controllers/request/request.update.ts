import { Request, Response } from "express";
import knex from "../../database";
import { expressValidator } from "../../utils/util.validator";

export const updateRequest = async (
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
				message: "request ID diperlukan",
			});
		}

		const existingrequest = await knex("requests").where({ id }).first();

		if (!existingrequest) {
			return res.status(404).json({
				status: res.statusCode,
				method: req.method,
				message: "request tidak ditemukan",
			});
		}

		const requestData: any = {
			updated_at: new Date(),
		};

		// Add fields that can be updated
		if (req.body.flag !== undefined) requestData.flag = req.body.flag;
		if (req.body.sales_order !== undefined)
			requestData.sales_order = req.body.sales_order;
		if (req.body.customer !== undefined)
			requestData.customer = req.body.customer;
		if (req.body.name !== undefined) requestData.name = req.body.name;
		if (req.body.customer_address_group !== undefined)
			requestData.customer_address_group = req.body.customer_address_group;
		if (req.body.prices_include_sales_tax !== undefined)
			requestData.prices_include_sales_tax = req.body.prices_include_sales_tax;
		if (req.body.sales_name !== undefined)
			requestData.sales_name = req.body.sales_name;
		if (req.body.item_number !== undefined)
			requestData.item_number = req.body.item_number;
		if (req.body.currency !== undefined)
			requestData.currency = req.body.currency;
		if (req.body.product_name !== undefined)
			requestData.product_name = req.body.product_name;
		if (req.body.unit !== undefined) requestData.unit = req.body.unit;
		if (req.body.quantity !== undefined)
			requestData.quantity = req.body.quantity;
		if (req.body.unit_price !== undefined)
			requestData.unit_price = req.body.unit_price;
		if (req.body.discount_percent !== undefined)
			requestData.discount_percent = req.body.discount_percent;
		if (req.body.deliver_remainder !== undefined)
			requestData.deliver_remainder = req.body.deliver_remainder;
		if (req.body.remain_qty_2 !== undefined)
			requestData.remain_qty_2 = req.body.remain_qty_2;
		if (req.body.remain_unit_2 !== undefined)
			requestData.remain_unit_2 = req.body.remain_unit_2;
		if (req.body.sales_tax_group !== undefined)
			requestData.sales_tax_group = req.body.sales_tax_group;
		if (req.body.item_sales_tax_group !== undefined)
			requestData.item_sales_tax_group = req.body.item_sales_tax_group;
		if (req.body.value !== undefined) requestData.value = req.body.value;
		if (req.body.value_inc_tax !== undefined)
			requestData.value_inc_tax = req.body.value_inc_tax;
		if (req.body.dimension_value !== undefined)
			requestData.dimension_value = req.body.dimension_value;

		// Update request
		const updateResult = await knex("requests")
			.where({ id })
			.update(requestData);

		if (updateResult === 0) {
			return res.status(408).json({
				status: res.statusCode,
				method: req.method,
				message: "Gagal mengupdate request, server sibuk",
			});
		}

		// Get updated request
		const updatedrequest = await knex("requests").where({ id }).first();

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: "request berhasil diupdate",
			data: updatedrequest,
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal mengupdate request",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
