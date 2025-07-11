import { createInvoice } from "./invoice.create";
import { resultsInvoice } from "./invoice.results";
import { deleteInvoice } from "./invoice.delete";
import { detailInvoice } from "./invoice.detail";
import { updateInvoice } from "./invoice.update";
import { uploadExcelInvoice } from "./invoice.upload";

export const InvoiceController = {
	createInvoice,
	resultsInvoice,
	deleteInvoice,
	detailInvoice,
	updateInvoice,
	uploadExcelInvoice,
};
