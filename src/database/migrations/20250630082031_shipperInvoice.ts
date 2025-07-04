import type { Knex } from "knex";

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.createTable(
		"shipperInvoice",
		(table: Knex.TableBuilder) => {
			table.increments("id").primary();
			table
				.integer("sales_invoice_id")
				.references("id")
				.inTable("productRequest")
				.onDelete("CASCADE")
				.onUpdate("CASCADE")
				.notNullable();
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
			table.timestamp("created_at").defaultTo(null);
			table.timestamp("updated_at").defaultTo(null);
		}
	);
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.dropTable("shipperInvoice");
}
