import {ProductSchema  } from "#database/schema";
import { hasMany } from '@adonisjs/lucid/orm'
import TransactionProduct from './transactions_products.ts'
import { type HasMany } from "@adonisjs/lucid/types/relations";


export default class Product extends ProductSchema {
   public static table = 'products'
  
  @hasMany(() => TransactionProduct)
  declare transactions: HasMany<typeof TransactionProduct> 
}



