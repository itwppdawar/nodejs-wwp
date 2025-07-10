import { Request, Response } from "express";
import knex from "../../database";

export const detailRequest = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				status: res.statusCode,
				method: req.method,
				message: "request diperlukan",
			});
		}

		// Ambil data request berdasarkan ID
		const request = await knex("requests").where({ id }).first();

		if (!request) {
			return res.status(404).json({
				status: res.statusCode,
				method: req.method,
				message: "request tidak ditemukan",
			});
		}

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: "Detail request berhasil diambil",
			data: request,
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal mengambil detail request",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
