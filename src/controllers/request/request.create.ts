import { Request, Response } from "express";
import knex from "../../database";
import { expressValidator } from "../../utils/util.validator";

export const createRequest = async (
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
		const requestData = {
			flag: req.body.flag,
			sales_order: req.body.sales_order,
			customer: req.body.customer,
			name: req.body.name,
			customer_address_group: req.body.customer_address_group,
			prices_include_sales_tax: req.body.prices_include_sales_tax,
			sales_name: req.body.sales_name,
			item_number: req.body.item_number,
			currency: req.body.currency,
			product_name: req.body.product_name,
			unit: req.body.unit,
			quantity: req.body.quantity,
			unit_price: req.body.unit_price,
			discount_percent: req.body.discount_percent,
			deliver_remainder: req.body.deliver_remainder,
			remain_qty_2: req.body.remain_qty_2,
			remain_unit_2: req.body.remain_unit_2,
			sales_tax_group: req.body.sales_tax_group,
			item_sales_tax_group: req.body.item_sales_tax_group,
			value: req.body.value,
			value_inc_tax: req.body.value_inc_tax,
			dimension_value: req.body.dimension_value,
		};

		const [report] = await knex("requests").insert(requestData).returning("*");

		return res.status(201).json({
			status: res.statusCode,
			method: req.method,
			message: "Request berhasil dibuat",
			data: report,
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal membuat Request",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
