import type { Knex } from "knex";


export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.createTable('productRequest', (table: Knex.TableBuilder) => {
        table.increments('id').primary()
        table
			.integer('sales_request_id')
			.references('id')
			.inTable('salesRequest')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
			.notNullable()
        table.string('item_number').notNullable()
        table.string('currency').nullable()
        table.string('product_name').nullable()
        table.string('unit').nullable()
        table.string('remain_unit_2').notNullable()
        table.string('quantity').notNullable()
        table.timestamp('created_at').defaultTo(null)
        table.timestamp('updated_at').defaultTo(null)
    })

}


export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.dropTable('productRequest')
}

