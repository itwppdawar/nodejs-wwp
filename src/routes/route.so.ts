import express, { Router } from "express";
import { salesOrderController } from "../controllers/sO";
import { roleJwt } from "../middlewares/middleware.role";
import { salesOrderValidator } from "../utils/util.validator";
import { excelUpload } from "../utils/util.excel.upload";
const router: Router = express.Router();

router.post(
	"/sales-order",
	[roleJwt(), ...salesOrderValidator()],
	salesOrderController.createSo
);
router.get("/sales-order", [roleJwt()], salesOrderController.resultsSO);
router.get("/sales-order/:id", [roleJwt()], salesOrderController.detailSo);
router.delete("/sales-order/:id", [roleJwt()], salesOrderController.deleteSo);
router.put("/sales-order/:id", [roleJwt()], salesOrderController.updateSo);
router.post(
	"/upload-so",
	[roleJwt(), excelUpload.single("file")],
	salesOrderController.uploadExcelSo
);
export default router;
