import { Request, Response } from "express";
import knex from "../../database";

// Tambahkan fungsi baru untuk mendapatkan data report
export const resultsRequest = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	try {
		const requestId = req.params.id;
		if (requestId) {
			const request = await knex("requests").where({ id: requestId }).first();

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
				message: "request berhasil diambil",
				data: request,
			});
		} else {
			const page = parseInt(req.query.page as string) || 1;
			const limit = parseInt(req.query.limit as string) || 10;
			const offset = (page - 1) * limit;

			const [{ count }] = await knex("requests").count("* as count");

			const requests = await knex("requests")
				.orderBy("created_at", "desc")
				.limit(limit)
				.offset(offset);

			return res.status(200).json({
				status: res.statusCode,
				method: req.method,
				message: "Daftar request berhasil diambil",
				data: requests,
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
			message: "Gagal mengambil data request",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
