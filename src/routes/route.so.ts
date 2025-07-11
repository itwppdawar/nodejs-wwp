import express, { Router } from "express";
import { salesOrderController } from "../controllers/sO";
import { roleJwt } from "../middlewares/middleware.role";
import { reportValidator } from "../utils/util.validator";
import { excelUpload } from "../utils/util.excel.upload";
const router: Router = express.Router();

// router.post(
// 	"/report",
// 	[authJwt(), ...reportValidator()],
// 	requestController.createReport
// );
router.get("/sales-order", [roleJwt()], salesOrderController.resultsSO);
router.get("/sales-order/:id", [roleJwt()], salesOrderController.detailSo);
// router.delete("/request/:id", [authJwt()], requestController.deleterequest);
// router.put("/request/:id", [authJwt()], requestController.updateReport);
router.post(
	"/upload-so",
	[roleJwt(), excelUpload.single("file")],
	salesOrderController.uploadExcelSo
);
export default router;
