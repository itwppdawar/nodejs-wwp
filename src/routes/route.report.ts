import express, { Router } from "express";
import { reportController } from "../controllers/report";
import { authJwt } from "../middlewares/middleware.auth";
import { reportValidator } from "../utils/util.validator";

const router: Router = express.Router();

router.post(
	"/user/saldo",
	[authJwt(), ...reportValidator()],
	reportController.createReport
);
// router.get('/report', roleJwt(), reportController.resultsAdmin)
// router.get('/report/:id', [roleJwt(), ...paramsValiator()], reportController.resultAdmin)
// router.delete('/report/:id', [roleJwt(), ...paramsValiator()], reportController.deleteAdmin)
// router.put('/report/:id', [roleJwt(), ...paramsValiator(), ...adminValidator()], reportController.updateAdmin)

export default router;
