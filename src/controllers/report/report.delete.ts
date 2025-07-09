import { Request, Response } from "express";
import knex from "../../database";
import { expressValidator } from "../../utils/util.validator";

export const deleteReport = async (
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
				message: "Report diperlukan",
			});
		}

		// Cek apakah report exists
		const existingReport = await knex("reports").where({ id }).first();

		if (!existingReport) {
			return res.status(404).json({
				status: res.statusCode,
				method: req.method,
				message: "Report tidak ditemukan",
			});
		}

		// Delete report
		const deleteResult = await knex("reports").where({ id }).delete();

		if (deleteResult === 0) {
			return res.status(408).json({
				status: res.statusCode,
				method: req.method,
				message: "Gagal menghapus report, server sibuk",
			});
		}

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: "Report berhasil dihapus",
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal menghapus report",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
