import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('client')
        .unsigned()
        .references('id')
        .inTable('client')
    
      table
        .integer('gateway_id')
        .unsigned()
        .references('id')
        .inTable('gateways')

      table.string('external_id')

      table
        .enum('status', ['pending', 'approved', 'rejected', 'refunded', 'cancelled','failed', 'compensated' ])
        .defaultTo('pending')

      table.integer('value')

      table.string('card_last_numbers')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.string('idempotency_key').unique()
      

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}