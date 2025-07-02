import type { Knex } from "knex";

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.createTable(
		"customerReport",
		(table: Knex.TableBuilder) => {
			table.increments("id").primary();
			table
				.integer("division_id")
				.references("id")
				.inTable("divisionReport")
				.onDelete("CASCADE")
				.onUpdate("CASCADE")
				.notNullable();
			table.string("invoicing_name_custom").notNullable();
			table.string("group_city").nullable();
			table.string("group_county").nullable();
			table.string("group_state").nullable();
			table.string("credit_limit").nullable();
			table.string("cl_group").nullable();
			table.timestamp("created_at").defaultTo(null);
			table.timestamp("updated_at").defaultTo(null);
		}
	);
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.dropTable("customerReport");
}
