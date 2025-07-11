import express, { Router } from "express";
import { salesQoutationController } from "../controllers/sQ";
import { roleJwt } from "../middlewares/middleware.role";
import { salesQuotationValidator } from "../utils/util.validator";
// import { excelUpload } from "../utils/util.excel.upload";
import { excelUpload } from "../utils/util.excel.upload";
const router: Router = express.Router();

router.post(
	"/sales-qoutation",
	[roleJwt(), ...salesQuotationValidator()],
	salesQoutationController.createSq
);
router.get("/sales-qoutation", [roleJwt()], salesQoutationController.resultsSQ);
router.get(
	"/sales-qoutation/:id",
	[roleJwt()],
	salesQoutationController.detailSQ
);
router.delete(
	"/sales-qoutation/:id",
	[roleJwt()],
	salesQoutationController.deleteSq
);
router.put(
	"/sales-qoutation/:id",
	[roleJwt()],
	salesQoutationController.updateSq
);
router.post(
	"/upload-sales-qoutation",
	[roleJwt(), excelUpload.single("file")],
	salesQoutationController.uploadExcelSq
);
export default router;
