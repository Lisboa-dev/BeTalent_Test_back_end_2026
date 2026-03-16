import {  TransactionProductSchema} from "#database/schema";
import { belongsTo } from '@adonisjs/lucid/orm'
import Transactions from './transactions.ts'
import Product from "./product.ts";
import { type BelongsTo } from "@adonisjs/lucid/types/relations";

export default class TransactionsProducts extends TransactionProductSchema {


@belongsTo(() => Transactions)
declare transaction: BelongsTo<typeof Transactions> | undefined

@belongsTo(() => Product)
declare product: BelongsTo<typeof Product> | undefined 
}