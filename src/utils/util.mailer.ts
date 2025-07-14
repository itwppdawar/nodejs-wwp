import * as nodemailer from "nodemailer";

if (!process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
	throw new Error("GMAIL_USER atau GMAIL_APP_PASSWORD belum di-set di .env");
}
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD,
	},
});

export default transporter;
