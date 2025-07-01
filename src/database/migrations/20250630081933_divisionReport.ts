import type { Knex } from "knex";


export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.createTable('divisionReport', (table: Knex.TableBuilder) => {
		table.increments('id').primary()
		table
			.integer('item_id')
			.references('id')
			.inTable('itemReport')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
			.notNullable()
		table.string('divisi').notNullable()
		table.string('credit_limit').nullable()
		table.string('cl_group').nullable()
		table.timestamp('created_at').defaultTo(null)
		table.timestamp('updated_at').defaultTo(null)
	})

}


export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
await knex.schema.dropTable('divisionReport')
}

