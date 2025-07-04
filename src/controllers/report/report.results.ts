import { Request, Response } from "express";
import knex from "../../database";

// ... [interface CreateReportRequest dan fungsi createReport tetap sama] ...

// Tambahkan fungsi baru untuk mendapatkan data report
export const resultsReport = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	try {
		const reportId = req.params.id;

		// Jika ada ID, ambil report spesifik
		if (reportId) {
			// Ambil data sales report
			const salesReport = await knex("salesReport")
				.where({ id: reportId })
				.first();

			if (!salesReport) {
				return res.status(404).json({
					status: res.statusCode,
					method: req.method,
					message: "Report tidak ditemukan",
				});
			}

			// Ambil data items dengan sales_id yang sesuai
			const items = await knex("itemReport").where({
				sales_id: salesReport.id,
			});

			const itemIds = items.map((item) => item.id);

			// Ambil data price berdasarkan item_id
			const prices = await knex("priceReport").whereIn("item_id", itemIds);

			// Ambil data division berdasarkan item_id
			const divisions = await knex("divisionReport").whereIn(
				"item_id",
				itemIds
			);

			const divisionIds = divisions.map((div) => div.id);

			// Ambil data customer berdasarkan division_id
			const customers = await knex("customerReport").whereIn(
				"division_id",
				divisionIds
			);

			// Gabungkan semua data
			const fullReport = {
				sales: salesReport,
				items: items.map((item) => {
					// Cari price yang sesuai dengan item
					const itemPrices = prices.filter((p) => p.item_id === item.id);
					// Cari division yang sesuai dengan item
					const itemDivisions = divisions.filter((d) => d.item_id === item.id);
					// Gabungkan division dengan customer
					const divisionsWithCustomers = itemDivisions.map((division) => {
						const divCustomers = customers.filter(
							(c) => c.division_id === division.id
						);
						return {
							...division,
							customers: divCustomers,
						};
					});

					return {
						...item,
						prices: itemPrices,
						divisions: divisionsWithCustomers,
					};
				}),
			};

			return res.status(200).json({
				status: res.statusCode,
				method: req.method,
				message: "Report berhasil diambil",
				data: fullReport,
			});
		}
		// Jika tidak ada ID, ambil semua report (dengan pagination)
		else {
			const page = parseInt(req.query.page as string) || 1;
			const limit = parseInt(req.query.limit as string) || 10;
			const offset = (page - 1) * limit;

			// Hitung total reports untuk pagination
			const [{ count }] = await knex("salesReport").count("* as count");

			// Ambil daftar sales reports dengan pagination
			const salesReports = await knex("salesReport")
				.orderBy("created_at", "desc")
				.limit(limit)
				.offset(offset);

			return res.status(200).json({
				status: res.statusCode,
				method: req.method,
				message: "Daftar report berhasil diambil",
				data: salesReports,
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
