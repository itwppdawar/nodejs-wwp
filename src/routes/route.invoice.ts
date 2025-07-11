import express, { Router } from "express";
import { InvoiceController } from "../controllers/invoice";
import { roleJwt } from "../middlewares/middleware.role";
import { reportValidator } from "../utils/util.validator";
import { excelUpload } from "../utils/util.excel.upload";
const router: Router = express.Router();

// router.post(
// 	"/report",
// 	[authJwt(), ...reportValidator()],
// 	requestController.createReport
// );
router.get("/invoice", [roleJwt()], InvoiceController.resultsInvoice);
router.get("/invoice/:id", [roleJwt()], InvoiceController.detailInvoice);
// router.delete("/request/:id", [authJwt()], requestController.deleterequest);
// router.put("/request/:id", [authJwt()], requestController.updateReport);

router.post(
	"/upload-sales-order",
	[roleJwt(), excelUpload.single("file")],
	InvoiceController.uploadExcelInvoice
);
export default router;
