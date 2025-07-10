import express, { Router } from "express";
import { InvoiceController } from "../controllers/invoice";
import { authJwt } from "../middlewares/middleware.auth";
import { reportValidator } from "../utils/util.validator";

const router: Router = express.Router();

// router.post(
// 	"/report",
// 	[authJwt(), ...reportValidator()],
// 	requestController.createReport
// );
router.get("/invoice", [authJwt()], InvoiceController.resultsInvoice);
router.get("/invoice/:id", [authJwt()], InvoiceController.detailInvoice);
// router.delete("/request/:id", [authJwt()], requestController.deleterequest);
// router.put("/request/:id", [authJwt()], requestController.updateReport);

export default router;
