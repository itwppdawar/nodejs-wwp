import http, { Server } from 'http'
import app from './src/app'

const server: Server = http.createServer(app)
server.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0', (): void => console.log(`server is running on ${process.env.HOST || '0.0.0.0'}:${process.env.PORT || 3000}`))
