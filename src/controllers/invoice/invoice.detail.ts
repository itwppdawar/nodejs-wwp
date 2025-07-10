import { Request, Response } from "express";
import knex from "../../database";

export const detailInvoice = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				status: res.statusCode,
				method: req.method,
				message: "Sales Qoutation diperlukan",
			});
		}

		// Ambil data Sales Qoutation berdasarkan ID
		const request = await knex("salesInvoice").where({ id }).first();

		if (!request) {
			return res.status(404).json({
				status: res.statusCode,
				method: req.method,
				message: "Sales Qoutation tidak ditemukan",
			});
		}

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: "Detail Sales Qoutation berhasil diambil",
			data: request,
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal mengambil detail Sales Qoutation",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
