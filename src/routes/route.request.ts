import express, { Router } from "express";
import { requestController } from "../controllers/request";
import { authJwt } from "../middlewares/middleware.auth";
import { reportValidator } from "../utils/util.validator";

const router: Router = express.Router();

// router.post(
// 	"/report",
// 	[authJwt(), ...reportValidator()],
// 	requestController.createReport
// );
router.get("/request", [authJwt()], requestController.resultsRequest);
router.get("/request/:id", [authJwt()], requestController.detailRequest);
// router.delete("/request/:id", [authJwt()], requestController.deleterequest);
// router.put("/request/:id", [authJwt()], requestController.updateReport);

export default router;
