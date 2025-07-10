import type { Knex } from "knex";

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.createTable("reports", (table: Knex.TableBuilder) => {
		table.increments("id").primary();
		table.string("company", 255).notNullable();
		table.string("sales_order", 255).notNullable();
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
		table.string("item_number").notNullable();
		table.string("item_name_origin").nullable();
		table.string("item_name").nullable();
		table.string("group_product").nullable();
		table.string("dimensi").nullable();
		table.string("thickness").nullable();
		table.string("length").nullable();
		table.string("length_m").nullable();
		table.string("color_type").nullable();
		table.string("size_width").notNullable();
		table.string("qty").notNullable();
		table.string("unit").notNullable();
		table.string("qty_in_kg_ppic").nullable();
		table.string("qty_in_kg_mkt").nullable();
		table.string("divisi").notNullable();
		table.string("credit_limit").nullable();
		table.string("cl_group").nullable();
		table.string("price").nullable();
		table.string("disc_percent").nullable();
		table.string("disc_value").nullable();
		table.string("line_discount").nullable();
		table.string("header_disc").nullable();
		table.string("total").nullable();
		table.string("tax_code").nullable();
		table.string("tax").nullable();
		table.string("total_and_tax").nullable();
		table.string("include_tax").nullable();
		table.string("invoicing_name_custom").notNullable();
		table.string("group_city").nullable();
		table.string("group_county").nullable();
		table.string("group_state").nullable();
		table.string("pkp").nullable();
		table.string("npwp").nullable();
		table.string("nama").nullable();
		table.string("alamat").nullable();
		table.string("kota").nullable();
		table.string("propinsi").nullable();
		table.string("sales_district_id").nullable();
		table.string("district").nullable();
		table.string("term").notNullable();
		table.string("pay_status").notNullable();
		table.date("closed_date").nullable();
		table.text("note_1").nullable();
		table.text("note_2").nullable();
		table.text("note_3").nullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
	await knex.schema.dropTable("reports");
}
