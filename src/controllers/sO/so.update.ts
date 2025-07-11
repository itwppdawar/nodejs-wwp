import { Request, Response } from "express";
import knex from "../../database";
import { expressValidator } from "../../utils/util.validator";

export const updateSo = async (
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
				message: "Sales Order ID diperlukan",
			});
		}

		const existingSo = await knex("so").where({ id }).first();

		if (!existingSo) {
			return res.status(404).json({
				status: res.statusCode,
				method: req.method,
				message: "Sales Order tidak ditemukan",
			});
		}

		const SoData: any = {
			updated_at: new Date(),
		};

		if (req.body.flag !== undefined) SoData.flag = req.body.flag;
		if (req.body.sales_order !== undefined)
			SoData.sales_order = req.body.sales_order;
		if (req.body.customer !== undefined) SoData.customer = req.body.customer;
		if (req.body.name !== undefined) SoData.name = req.body.name;
		if (req.body.customer_address_group !== undefined)
			SoData.customer_address_group = req.body.customer_address_group;
		if (req.body.prices_include_sales_tax !== undefined)
			SoData.prices_include_sales_tax = req.body.prices_include_sales_tax;
		if (req.body.sales_name !== undefined)
			SoData.sales_name = req.body.sales_name;
		if (req.body.item_number !== undefined)
			SoData.item_number = req.body.item_number;
		if (req.body.currency !== undefined) SoData.currency = req.body.currency;
		if (req.body.product_name !== undefined)
			SoData.product_name = req.body.product_name;
		if (req.body.unit !== undefined) SoData.unit = req.body.unit;
		if (req.body.quantity !== undefined) SoData.quantity = req.body.quantity;
		if (req.body.unit_price !== undefined)
			SoData.unit_price = req.body.unit_price;
		if (req.body.discount_percent !== undefined)
			SoData.discount_percent = req.body.discount_percent;
		if (req.body.deliver_remainder !== undefined)
			SoData.deliver_remainder = req.body.deliver_remainder;
		if (req.body.remain_qty_2 !== undefined)
			SoData.remain_qty_2 = req.body.remain_qty_2;
		if (req.body.remain_unit_2 !== undefined)
			SoData.remain_unit_2 = req.body.remain_unit_2;
		if (req.body.sales_tax_group !== undefined)
			SoData.sales_tax_group = req.body.sales_tax_group;
		if (req.body.item_sales_tax_group !== undefined)
			SoData.item_sales_tax_group = req.body.item_sales_tax_group;
		if (req.body.value !== undefined) SoData.value = req.body.value;
		if (req.body.value_inc_tax !== undefined)
			SoData.value_inc_tax = req.body.value_inc_tax;
		if (req.body.dimension_value !== undefined)
			SoData.dimension_value = req.body.dimension_value;

		const updateResult = await knex("so").where({ id }).update(SoData);

		if (updateResult === 0) {
			return res.status(408).json({
				status: res.statusCode,
				method: req.method,
				message: "Gagal mengupdate Sales Order, server sibuk",
			});
		}

		const updatedso = await knex("so").where({ id }).first();

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: "sales order berhasil diupdate",
			data: updatedso,
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal mengupdate salaes order",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
