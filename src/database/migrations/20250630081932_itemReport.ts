import type { Knex } from "knex";

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.createTable("itemReport", (table: Knex.TableBuilder) => {
		table.increments("id").primary();
		table
			.integer("sales_id")
			.references("id")
			.inTable("salesReport")
			.onDelete("CASCADE")
			.onUpdate("CASCADE")
			.notNullable();
		table.string("item_number").unique();
		table.string("item_name_origin").nullable();
		table.string("item_name").nullable();
		table.string("group_product").nullable();
		table.string("thickness").nullable();
		table.string("length").nullable();
		table.string("length_m").nullable();
		table.string("color_type").notNullable();
		table.string("size_width").notNullable();
		table.integer("qty").notNullable();
		table.string("unit").notNullable();
		table.string("qty_in_kg_ppic").nullable();
		table.string("qty_in_kg_mkt").nullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.dropTable("itemReport");
}
