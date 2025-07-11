import { Request, Response } from "express";
import knex from "../../database";
import { expressValidator } from "../../utils/util.validator";

export const deleteInvoice = async (
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
				message: "invoice diperlukan",
			});
		}

		// Cek apakah invoice exists
		const existinginvoice = await knex("salesInvoice").where({ id }).first();

		if (!existinginvoice) {
			return res.status(404).json({
				status: res.statusCode,
				method: req.method,
				message: "invoice tidak ditemukan",
			});
		}

		// Delete invoice
		const deleteResult = await knex("salesInvoice").where({ id }).delete();

		if (deleteResult === 0) {
			return res.status(408).json({
				status: res.statusCode,
				method: req.method,
				message: "Gagal menghapus invoice, server sibuk",
			});
		}

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: "invoice berhasil dihapus",
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Gagal menghapus invoice",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
