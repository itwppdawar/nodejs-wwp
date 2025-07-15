import http, { Server } from "http";
import app from "./src/app";

const server: Server = http.createServer(app);
const port = parseInt(process.env.PORT || "3000", 10);
const host = process.env.HOST || "0.0.0.0";

server.listen(port, host, (): void =>
	console.log(`server is running on ${host}:${port}`)
);
