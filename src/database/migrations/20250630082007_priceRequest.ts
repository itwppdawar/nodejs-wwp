import type { Knex } from "knex";


export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.createTable('priceRequest', (table: Knex.TableBuilder) => {
        table.increments('id').primary()
        table
			.integer('product_request_id')
			.references('id')
			.inTable('productRequest')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
			.notNullable()
        table.string('unit_price').notNullable()
        table.string('discount_percent').nullable()
        table.string('deliver_remainder').nullable()
        table.string('remain_qty_2').nullable()
        table.string('remain_unit_2').notNullable()
        table.string('sales_tax_group').notNullable()
        table.string('item_sales_tax_group').notNullable()
        table.string('value').nullable()
        table.string('value_inc_tax').notNullable()
        table.string('dimension_value').nullable()
        table.timestamp('created_at').defaultTo(null)
        table.timestamp('updated_at').defaultTo(null)
    })

}


export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.dropTable('priceRequest')
}

