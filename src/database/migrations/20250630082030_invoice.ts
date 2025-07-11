import type { Knex } from "knex";

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.createTable("salesInvoice", (table: Knex.TableBuilder) => {
		table.increments("id").primary();
		table.string("invoice_account").notNullable();
		table.string("description").nullable();
		table.string("customer_address_group").nullable();
		table.string("customer_credit_limit_group").nullable();
		table.string("sales_order").notNullable();
		table.string("sales_responsible").notNullable();
		table.string("currency").notNullable();
		table.string("payment").notNullable();
		table.string("packing_slip").notNullable();
		table.string("external_packing_slid").nullable();
		table.date("date").nullable();
		table.string("delivery_name").notNullable();
		table.string("note").notNullable();
		table.string("item_number").notNullable();
		table.string("product_name").notNullable();
		table.string("delivered").notNullable();
		table.string("unit").notNullable();
		table.string("delivered_2").notNullable();
		table.string("unit_2").notNullable();
		table.string("unit_price").notNullable();
		table.string("discount_percent").nullable();
		table.string("total_discount_percent").nullable();
		table.string("amount").nullable();
		table.string("tax_amount").nullable();
		table.string("prices_include_sales_tax").nullable();
		table.string("amount_exc_tax").nullable();
		table.string("amount_inc_tax").nullable();
		table.string("value").nullable();
		table.string("div").nullable();
		table.timestamp("created_at").defaultTo(null);
		table.timestamp("updated_at").defaultTo(null);
	});
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.dropTable("salesInvoice");
}
