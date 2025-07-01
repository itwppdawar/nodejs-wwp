import type { Knex } from "knex";


export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.createTable('shipperReport', (table: Knex.TableBuilder) => {
		table.increments('id').primary()
		table
			.integer('item_id')
			.references('id')
			.inTable('itemReport')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
			.notNullable()
        table
			.integer('division_id')
			.references('id')
			.inTable('divisionReport')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
			.notNullable()
		table.string('kota').notNullable()
		table.string('propinsi').notNullable()
		table.string('sales_district_id').notNullable()
		table.string('district').notNullable()
		table.string('term').notNullable()
		table.string('pay_status').notNullable()
		table.date('closed_date').nullable()
		table.text('note_1').nullable()
		table.text('note_2').nullable()
		table.text('note_3').nullable()
		table.timestamp('created_at').defaultTo(null)
		table.timestamp('updated_at').defaultTo(null)
	})

}


export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.dropTable('shipperReport')
}

