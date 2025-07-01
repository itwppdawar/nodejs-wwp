import type { Knex } from "knex";


export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.createTable('salesRequest', (table: Knex.TableBuilder) => {
        table.increments('id').primary()
        table.string('flag').notNullable()
        table.string('sales_order').unique().nullable()
        table.string('customer').unique().nullable()
        table.string('name').nullable()
        table.string('customer_address_group').nullable()
        table.string('prices_include_sales_tax').nullable()
        table.string('sales_name').nullable()
        table.timestamp('created_at').defaultTo(null)
        table.timestamp('updated_at').defaultTo(null)
    })

}


export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.dropTable('salesRequest')
}

