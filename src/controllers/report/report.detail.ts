import { Request, Response } from "express";
import knex from "../../database";

export const detailReport = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				status: res.statusCode,
				method: req.method,
				message: "Report diperlukan",
			});
		}

		// Ambil data report berdasarkan ID
		const report = await knex("reports").where({ id }).first();

		if (!report) {
			return res.status(404).json({
				status: res.statusCode,
				method: req.method,
				message: "Report tidak ditemukan",
			});
		}

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: "Detail report berhasil diambil",
			data: report,
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal mengambil detail report",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
