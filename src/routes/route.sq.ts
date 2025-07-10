import express, { Router } from "express";
import { salesQoutationController } from "../controllers/sQ";
import { authJwt } from "../middlewares/middleware.auth";
import { reportValidator } from "../utils/util.validator";
// import { excelUpload } from "../utils/util.excel.upload";

const router: Router = express.Router();

// router.post(
// 	"/report",
// 	[authJwt(), ...reportValidator()],
// 	requestController.createReport
// );
router.get("/sales-qoutation", [authJwt()], salesQoutationController.resultsSQ);
router.get(
	"/sales-qoutation/:id",
	[authJwt()],
	salesQoutationController.detailSQ
);

export default router;
