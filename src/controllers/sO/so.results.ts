import { Request, Response } from "express";
import knex from "../../database";

export const resultsSO = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	try {
		const soId = req.params.id;
		if (soId) {
			const so = await knex("so").where({ id: soId }).first();

			if (!so) {
				return res.status(404).json({
					status: res.statusCode,
					method: req.method,
					message: "Sales Order tidak ditemukan",
				});
			}

			return res.status(200).json({
				status: res.statusCode,
				method: req.method,
				message: "Sales Order berhasil diambil",
				data: so,
			});
		} else {
			const page = parseInt(req.query.page as string) || 1;
			const limit = parseInt(req.query.limit as string) || 10;
			const offset = (page - 1) * limit;

			const [{ count }] = await knex("so").count("* as count");

			const salesOrders = await knex("so")
				.orderBy("created_at", "desc")
				.limit(limit)
				.offset(offset);

			return res.status(200).json({
				status: res.statusCode,
				method: req.method,
				message: "Daftar Sales Order berhasil diambil",
				data: salesOrders,
				pagination: {
					total: parseInt(count as string),
					page,
					limit,
					totalPages: Math.ceil(parseInt(count as string) / limit),
				},
			});
		}
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal mengambil data Sales Order",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
