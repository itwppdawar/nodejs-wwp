import express, { Router } from "express";
import { InvoiceController } from "../controllers/invoice";
import { roleJwt } from "../middlewares/middleware.role";
import { invoiceValidator } from "../utils/util.validator";
import { excelUpload } from "../utils/util.excel.upload";
const router: Router = express.Router();

router.post(
	"/invoice",
	[roleJwt(), ...invoiceValidator()],
	InvoiceController.createInvoice
);
router.get("/invoice", [roleJwt()], InvoiceController.resultsInvoice);
router.get("/invoice/:id", [roleJwt()], InvoiceController.detailInvoice);
router.delete("/invoice/:id", [roleJwt()], InvoiceController.deleteInvoice);
router.put("/invoice/:id", [roleJwt()], InvoiceController.updateInvoice);

router.post(
	"/upload-sales-order",
	[roleJwt(), excelUpload.single("file")],
	InvoiceController.uploadExcelInvoice
);
export default router;
