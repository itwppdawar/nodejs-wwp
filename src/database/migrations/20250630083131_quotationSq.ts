import type { Knex } from "knex";


export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.createTable('quotationSq', (table: Knex.TableBuilder) => {
        table.increments('id').primary()
        table.string('quotation').nullable()
        table.timestamp('created_date_and_time').nullable()
        table.string('invoice_account').nullable()
        table.string('name').nullable()
        table.string('prospect').nullable()
        table.string('customer_address_group').nullable()
        table.string('quotation_status').nullable()
        table.string('delivery_name').nullable()
        table.timestamp('created_at').defaultTo(null)
        table.timestamp('updated_at').defaultTo(null)
    })

}


export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.dropTable('quotationSq')
}

