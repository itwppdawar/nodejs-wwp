import { Application, Request, Response } from "express";
import adminRoute from "../routes/route.admin";
import userRoute from "../routes/route.user";
import reportPenjualan from "../routes/route.report";
import request from "../routes/route.request";
import sq from "../routes/route.sq";
import so from "../routes/route.so";
import invoice from "../routes/route.invoice";

export const routeMiddleware = (app: Application): void => {
	app.use("/api/v1", adminRoute);
	app.use("/api/v1", userRoute);
	app.use("/api/v1", reportPenjualan);
	app.use("/api/v1", request);
	app.use("/api/v1", sq);
	app.use("/api/v1", so);
	app.use("/api/v1", invoice);
	app.get(
		"/",
		(req: Request, res: Response): Response<any> => {
			return res.send("<h1>Welcome To Express WPP ERP</h1>");
		}
	);
};
