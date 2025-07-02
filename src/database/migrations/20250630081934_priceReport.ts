import type { Knex } from "knex";

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.createTable("priceReport", (table: Knex.TableBuilder) => {
		table.increments("id").primary();
		table
			.integer("item_id")
			.references("id")
			.inTable("itemReport")
			.onDelete("CASCADE")
			.onUpdate("CASCADE")
			.notNullable();
		table.decimal("price", 15, 5).unique();
		table.decimal("disc_percent", 15, 5).nullable();
		table.decimal("disc_value", 15, 5).nullable();
		table.decimal("line_discount", 15, 5).nullable();
		table.decimal("header_disc", 15, 5).nullable();
		table.decimal("total", 15, 5).nullable();
		table.string("tax_code").nullable();
		table.decimal("tax", 15, 5).nullable();
		table.integer("total_and_tax").nullable();
		table.integer("include_tax").nullable();
		table.timestamp("created_at").defaultTo(null);
		table.timestamp("updated_at").defaultTo(null);
	});
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.dropTable("priceReport");
}
