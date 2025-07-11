import { Request, Response } from "express";
import knex from "../../database";
import { expressValidator } from "../../utils/util.validator";

export const deleteRequest = async (
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
				message: "Request diperlukan",
			});
		}

		const existingRequest = await knex("requests").where({ id }).first();

		if (!existingRequest) {
			return res.status(404).json({
				status: res.statusCode,
				method: req.method,
				message: "Request tidak ditemukan",
			});
		}

		const deleteResult = await knex("requests").where({ id }).delete();

		if (deleteResult === 0) {
			return res.status(408).json({
				status: res.statusCode,
				method: req.method,
				message: "Gagal menghapus Request, server sibuk",
			});
		}

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: "Request berhasil dihapus",
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal menghapus Request",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
