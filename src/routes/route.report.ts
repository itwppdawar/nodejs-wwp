import express, { Router } from "express";
import { reportController } from "../controllers/report";
import { authJwt } from "../middlewares/middleware.auth";
import { reportValidator } from "../utils/util.validator";

const router: Router = express.Router();

router.post(
	"/report",
	[authJwt(), ...reportValidator()],
	reportController.createReport
);
router.get("/report", [authJwt()], reportController.resultsReport);
router.get("/report/:id", [authJwt()], reportController.detailReport);
router.delete("/report/:id", [authJwt()], reportController.deleteReport);
router.put("/report/:id", [authJwt()], reportController.updateReport);

export default router;
