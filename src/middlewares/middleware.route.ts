import { Application, Request, Response } from 'express'
import adminRoute from '../routes/route.admin'
import userRoute from '../routes/route.user'
import reportPenjualan from '../routes/report.penjualan'
import requestOpen from '../routes/request.open'
import sqoOpen from '../routes/sq.open'
import soOpen from '../routes/so.open'

export const routeMiddleware = (app: Application): void => {
	app.use('/api/v1', adminRoute)
	app.use('/api/v1', userRoute)
	app.use('/api/v1', reportPenjualan)
	app.use('/api/v1', requestOpen)
	app.use('/api/v1', sqoOpen)
	app.use('/api/v1', soOpen)
	app.get(
		'/',
		(req: Request, res: Response): Response<any> => {
			return res.send('<h1>Welcome To Express Fake Payment Gateway</h1>')
		}
	)
}
