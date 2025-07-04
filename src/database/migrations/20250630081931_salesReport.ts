import type { Knex } from "knex";

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.createTable("salesReport", (table: Knex.TableBuilder) => {
		table.increments("id").primary();
		table.string("company", 255).notNullable();
		table.string("sales_order", 255).unique();
		table.string("po_number", 255).nullable();
		table.string("so_date", 255).nullable();
		table.string("invoice", 255).nullable();
		table.string("external_invoice", 255).notNullable();
		table.date("invoice_date").defaultTo(null);
		table.date("due_date").defaultTo(null);
		table.string("invoice_account", 255).nullable();
		table.string("name", 255).nullable();
		table.string("address_group", 255).nullable();
		table.date("packslip_date").nullable();
		table.string("packing_slip", 255).nullable();
		table.string("external_packing_slip", 255).nullable();
		table.string("sales", 255).nullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.dropTable("salesReport");
}
