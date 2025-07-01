import type { Knex } from "knex";


export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.createTable('salesInvoice', (table: Knex.TableBuilder) => {
        table.increments('id').primary()
        table.string('invoice_account').unique().notNullable()
        table.string('description').nullable()
        table.string('customer_address_group').nullable()
        table.string('customer_credit_limit_group').nullable()
        table.string('sales_order').notNullable()
        table.string('sales_responsible').notNullable()
        table.timestamp('created_at').defaultTo(null)
        table.timestamp('updated_at').defaultTo(null)
    })

}


export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.dropTable('salesInvoice')
}

