import type { Knex } from "knex";

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.createTable("so", (table: Knex.TableBuilder) => {
		table.increments("id").primary();
		table.string("flag").notNullable();
		table.string("sales_order").nullable();
		table.string("customer").nullable();
		table.string("name").nullable();
		table.string("customer_address_group").nullable();
		table.string("prices_include_sales_tax").nullable();
		table.string("sales_name").nullable();
		table.string("item_number").notNullable();
		table.string("currency").nullable();
		table.string("product_name").nullable();
		table.string("unit").nullable();
		table.string("quantity").notNullable();
		table.string("unit_price").notNullable();
		table.string("discount_percent").nullable();
		table.string("deliver_remainder").nullable();
		table.string("remain_qty_2").nullable();
		table.string("remain_unit_2").notNullable();
		table.string("sales_tax_group").notNullable();
		table.string("item_sales_tax_group").notNullable();
		table.string("value").nullable();
		table.string("value_inc_tax").notNullable();
		table.string("dimension_value").nullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.dropTable("so");
}
