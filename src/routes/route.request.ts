import express, { Router } from "express";
import { requestController } from "../controllers/request";
import { roleJwt } from "../middlewares/middleware.role";
import { requestValidator } from "../utils/util.validator";
import { excelUpload } from "../utils/util.excel.upload";
const router: Router = express.Router();

router.post(
	"/request",
	[roleJwt(), ...requestValidator()],
	requestController.createRequest
);
router.get("/request", [roleJwt()], requestController.resultsRequest);
router.get("/request/:id", [roleJwt()], requestController.detailRequest);
router.delete("/request/:id", [roleJwt()], requestController.deleteRequest);
router.put("/request/:id", [roleJwt()], requestController.updateRequest);
router.post(
	"/upload-request",
	[roleJwt(), excelUpload.single("file")],
	requestController.uploadExcelRequest
);
export default router;
