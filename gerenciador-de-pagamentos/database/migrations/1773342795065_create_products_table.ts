import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('status', ['in_stock', 'not_stock']).defaultTo('in_stock')
      table.string('name').notNullable()
      table.text('description')
      table.integer('price').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.integer('stock').defaultTo(0)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}