import { Request, Response } from "express";
import knex from "../../database";

// Tambahkan fungsi baru untuk mendapatkan data report
export const resultsReport = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	try {
		const reportId = req.params.id;

		// Jika ada ID, ambil report spesifik
		if (reportId) {
			const report = await knex("reports").where({ id: reportId }).first();

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
				message: "Report berhasil diambil",
				data: report,
			});
		}
		// Jika tidak ada ID, ambil semua report (dengan pagination)
		else {
			const page = parseInt(req.query.page as string) || 1;
			const limit = parseInt(req.query.limit as string) || 10;
			const offset = (page - 1) * limit;

			// Hitung total reports untuk pagination
			const [{ count }] = await knex("reports").count("* as count");

			// Ambil daftar reports dengan pagination
			const reports = await knex("reports")
				.orderBy("created_at", "desc")
				.limit(limit)
				.offset(offset);

			return res.status(200).json({
				status: res.statusCode,
				method: req.method,
				message: "Daftar report berhasil diambil",
				data: reports,
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
			message: "Gagal mengambil data report",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
