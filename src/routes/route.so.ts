import express, { Router } from "express";
import { salesOrderController } from "../controllers/sO";
import { authJwt } from "../middlewares/middleware.auth";
import { reportValidator } from "../utils/util.validator";

const router: Router = express.Router();

// router.post(
// 	"/report",
// 	[authJwt(), ...reportValidator()],
// 	requestController.createReport
// );
router.get("/sales-order", [authJwt()], salesOrderController.resultsSO);
router.get("/sales-order/:id", [authJwt()], salesOrderController.detailSo);
// router.delete("/request/:id", [authJwt()], requestController.deleterequest);
// router.put("/request/:id", [authJwt()], requestController.updateReport);

export default router;
