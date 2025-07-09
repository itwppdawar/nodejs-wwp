import type { Knex } from "knex";

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.createTable("sqs", (table: Knex.TableBuilder) => {
		table.increments("id").primary();
		table.string("quotation").nullable();
		table.timestamp("created_date_and_time").nullable();
		table.string("invoice_account").nullable();
		table.string("name").nullable();
		table.string("prospect").nullable();
		table.string("customer_address_group").nullable();
		table.string("quotation_status").nullable();
		table.string("delivery_name").nullable();
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
	await knex.schema.dropTable("sqs");
}
