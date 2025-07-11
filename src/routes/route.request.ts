import express, { Router } from "express";
import { requestController } from "../controllers/request";
import { roleJwt } from "../middlewares/middleware.role";
import { reportValidator } from "../utils/util.validator";
import { excelUpload } from "../utils/util.excel.upload";
const router: Router = express.Router();

// router.post(
// 	"/report",
// 	[authJwt(), ...reportValidator()],
// 	requestController.createReport
// );
router.get("/request", [roleJwt()], requestController.resultsRequest);
router.get("/request/:id", [roleJwt()], requestController.detailRequest);
// router.delete("/request/:id", [authJwt()], requestController.deleterequest);
// router.put("/request/:id", [authJwt()], requestController.updateReport);
router.post(
	"/upload-request",
	[roleJwt(), excelUpload.single("file")],
	requestController.uploadExcelRequest
);
export default router;
