import { Request, Response } from "express";
import transporter from "../../utils/util.mailer";
import knex from "../../database";
import { UsersDTO } from "../../dto/dto.users";
import { hashPassword } from "../../utils/util.encrypt";
import { signAccessToken } from "../../utils/util.jwt";
import { tempMailRegister } from "../../templates/template.register";
import { IRegisterMail } from "../../interface/interface.templatemail";
import { IJwt } from "../../interface/interface.jwt";
import { expressValidator } from "../../utils/util.validator";

export const register = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	const errors = expressValidator(req);

	if (errors.length > 0) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			errors,
		});
	}

	const checkUserId: UsersDTO[] = await knex<UsersDTO>("users")
		.where({ email: req.body.email })
		.select("*");
	if (checkUserId.length > 0) {
		return res.status(409).json({
			status: res.statusCode,
			method: req.method,
			message: "user account already exists, please try again",
		});
	}

	const saveUser: UsersDTO[] = await knex<UsersDTO>("users")
		.insert({
			email: req.body.email,
			password: hashPassword(req.body.password),
			created_at: new Date(),
		})
		.returning(["user_id", "email"]);

	if (Object.keys(saveUser[0]).length < 1) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: "create new user account failed, please try again",
		});
	}

	const { user_id, email }: UsersDTO = saveUser[0];
	const { accessToken }: IJwt = signAccessToken()(
		req,
		res,
		{ user_id: user_id, email: email },
		{ expiresIn: "5m" }
	);
	const template: IRegisterMail = tempMailRegister(email, accessToken);

	try {
		await transporter.sendMail({
			from: process.env.MAIL_USERNAME,
			to: template.to,
			subject: template.subject,
			html: template.html,
		});
	} catch (error) {
		return res.status(500).json({
			status: res.statusCode,
			method: req.method,
			message: "Server error failed to sending email activation",
		});
	}

	return res.status(201).json({
		status: res.statusCode,
		method: req.method,
		message: `create new account successfuly, please check your email ${email}`,
	});
};
