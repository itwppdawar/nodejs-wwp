import express, { Router } from "express";
import { reportController } from "../controllers/report";
import { reportValidator } from "../utils/util.validator";
import { roleJwt } from "../middlewares/middleware.role";

const router: Router = express.Router();

router.post(
	"/report",
	[roleJwt(), ...reportValidator()],
	reportController.createReport
);
router.get("/report", [roleJwt()], reportController.resultsReport);
router.get("/report/:id", [roleJwt()], reportController.detailReport);
router.delete("/report/:id", [roleJwt()], reportController.deleteReport);
router.put("/report/:id", [roleJwt()], reportController.updateReport);

export default router;
