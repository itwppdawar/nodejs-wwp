import type { Knex } from "knex";

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.createTable("productSq", (table: Knex.TableBuilder) => {
		table.increments("id").primary();
		table
			.integer("qoutation_id")
			.references("id")
			.inTable("quotationSq")
			.onDelete("CASCADE")
			.onUpdate("CASCADE")
			.notNullable();
		table.string("item_number").notNullable();
		table.string("product_name").notNullable();
		table.string("search_name").notNullable();
		table.string("site").notNullable();
		table.string("warehouse").notNullable();
		table.string("sales_taker").notNullable();
		table.string("sales_responsible").notNullable();
		table.string("quantity").notNullable();
		table.string("unit_price").notNullable();
		table.string("discount_percent").notNullable();
		table.string("discount").notNullable();
		table.string("net_amount").notNullable();
		table.string("dimension_value").notNullable();
		table.string("note_1").notNullable();
		table.string("note_2").notNullable();
		table.string("note_3").notNullable();
		table.timestamp("created_at").defaultTo(null);
		table.timestamp("updated_at").defaultTo(null);
	});
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.dropTable("productSq");
}
