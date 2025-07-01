import type { Knex } from "knex";


export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.createTable('priceReport', (table: Knex.TableBuilder) => {
		table.increments('id').primary()
		table
			.integer('item_id')
			.references('id')
			.inTable('itemReport')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
			.notNullable()
		table.decimal('price').unique()
		table.decimal('disc_percent').nullable()
		table.string('disc_value').nullable()
		table.string('group_product').nullable()
		table.string('thickness').nullable()
		table.string('length').nullable()
		table.string('length_m').nullable()
		table.string('color_type').notNullable()
		table.string('size_width').notNullable()
		table.integer('qty').notNullable()
		table.string('unit').notNullable()
		table.string('qty_in_kg_ppic').nullable()
        table.string('qty_in_kg_mkt').nullable()
		table.timestamp('created_at').defaultTo(null)
		table.timestamp('updated_at').defaultTo(null)
	})

}


export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.dropTable('priceReport')
}

