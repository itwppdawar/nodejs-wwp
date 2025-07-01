import type { Knex } from "knex";


export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.createTable('salesReport', (table: Knex.TableBuilder) => {
		table.increments('id').primary()
		table.string('company').notNullable()
		table.string('sales_order').unique()
		table.string('po_number').nullable()
		table.string('so_date').nullable()
		table.string('invoice').nullable()
		table.string('external_invoice').notNullable()
		table.date('invoice_date').defaultTo(null)
		table.date('due_date').defaultTo(null)
        table.string('invoice_account').nullable()
        table.string('name').nullable()
        table.string('address_group').nullable()
        table.date('packslip_date').nullable()
        table.string('packing_slip').nullable()
        table.string('external_packing_slip').nullable()
        table.string('sales').nullable()
		table.timestamp('created_at').defaultTo(null)
		table.timestamp('updated_at').defaultTo(null)
	})

}


export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.dropTable('salesReport')
}

