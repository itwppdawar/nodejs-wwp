import { createReport } from "./report.create";
import { resultsReport } from "./report.results";
import { detailReport } from "./report.detail";
import { deleteReport } from "./report.delete";
import { updateReport } from "./report.update";
import { uploadExcelReport } from "./report.upload";
export const reportController = {
	createReport,
	resultsReport,
	detailReport,
	deleteReport,
	updateReport,
	uploadExcelReport,
};
