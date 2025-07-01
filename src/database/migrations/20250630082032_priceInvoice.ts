import type { Knex } from "knex";


export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.createTable('priceInvoice', (table: Knex.TableBuilder) => {
        table.increments('id').primary()
        table
			.integer('shipper_invoice_id')
			.references('id')
			.inTable('shipperInvoice')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
			.notNullable()
        table.decimal('discount_percent', 15, 2).nullable()
        table.decimal('total_discount_percent', 15, 2).nullable()
        table.decimal('amount', 15, 2).nullable()
        table.decimal('tax_amount', 15, 2).nullable()
        table.string('prices_include_sales_tax').nullable()
        table.decimal('amount_exc_tax', 15, 2).nullable()
        table.decimal('amount_inc_tax', 15, 2).nullable()
        table.decimal('value', 15, 2).nullable()
        table.string('div').nullable()
        table.timestamp('created_at').defaultTo(null)
        table.timestamp('updated_at').defaultTo(null)
    })

}


export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.dropTable('priceInvoice')
}

