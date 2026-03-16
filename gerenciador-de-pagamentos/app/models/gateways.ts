import {  GatewaySchema} from "#database/schema";
import { hasMany } from '@adonisjs/lucid/orm'
import Transaction from './transactions.ts'
import { type HasMany } from "@adonisjs/lucid/types/relations";


export default class Gateways extends GatewaySchema {
  @hasMany(() => Transaction)
  declare transactions: HasMany<typeof Transaction> | undefined 
}

