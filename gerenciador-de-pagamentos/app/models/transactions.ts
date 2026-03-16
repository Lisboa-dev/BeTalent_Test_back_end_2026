import { TransactionSchema } from "#database/schema";
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import TransactionProduct from './transactions_products.ts'
import { type BelongsTo, type HasMany } from "@adonisjs/lucid/types/relations";
import User from './user.ts'
import Gateway from './gateways.ts'


export default class Transactions extends TransactionSchema {
     public static table = 'transactions'
   
    @hasMany(() => TransactionProduct)
    declare itens: HasMany<typeof TransactionProduct> 

    @belongsTo(() => User)
    declare user: BelongsTo<typeof User> 


    @belongsTo(() => Gateway)
    declare gateway: BelongsTo<typeof Gateway> 
}