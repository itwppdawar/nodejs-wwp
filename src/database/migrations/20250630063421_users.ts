import type { Knex } from "knex";

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.createTable("users", (table: Knex.TableBuilder) => {
		table.increments("user_id").primary();
		table.string("email").unique().notNullable();
		table.string("password").notNullable();
		table.string("photo").defaultTo("default.jpeg");
		table.boolean("active").defaultTo(false);
		table.string("role").defaultTo("user");
		table.dateTime("first_login").defaultTo(null);
		table.dateTime("last_login").defaultTo(null);
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.dropTable("users");
}
