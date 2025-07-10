import { Knex } from "knex";
import { hashPassword } from "../../utils/util.encrypt";

export async function seed(knex: Knex): Promise<void> {
	await knex("users").del();

	await knex("users").insert([
		{
			email: "superadmin@gmail.com",
			password: hashPassword("superadmin123"),
			photo: "default.jpeg",
			active: true,
			role: "superadmin",
			first_login: null,
			last_login: null,
			created_at: new Date(),
			updated_at: new Date(),
		},
	]);
}
