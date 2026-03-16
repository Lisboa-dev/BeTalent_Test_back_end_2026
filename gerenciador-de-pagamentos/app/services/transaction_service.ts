import redis from '@adonisjs/redis/services/main'
import Gateways from "#models/gateways"
import Product from "#models/product";
import Transactions from "#models/transactions";
import TransactionsProducts from "#models/transactions_products";
import db from '@adonisjs/lucid/services/db'
import gatewayManagerFactory from '../gateway/gatewayFactory.ts'
import { TransactionCreateDTO } from "../types/transactionDTO.ts";
import { ClientSchema } from '#database/schema';


export default class TransactionService {
  

 async payment(data: TransactionCreateDTO) {

  const existingTransaction = await Transactions
    .query()
    .where('idempotency_key', data.idempotency_key)
    .first()

  if (existingTransaction) {
    return existingTransaction
  }
    
  const trx = await db.transaction()

   try {
    
    let price = 0

    if (!data.client) {
      const client = await ClientSchema.create({
        email: data.email,
        name: data.name
      }, { client: trx })
      data.client = client.id
    }

    const transaction = await Transactions.create({
      client: data.client,
      idempotencyKey: data.idempotency_key,
      cardLastNumbers: data.payment.cardNumber.slice(-4),
    }, { client: trx })

    for (const item of data.products) {


      const product = await Product.findOrFail(item.id, { client: trx })

      if (!product.stock || product.stock ==0 || product.stock < item.quantity) {
        product.status = "not_stock"
        await product.save()
        throw new Error("stock insuficiente")
      }

      product.stock -= item.quantity
      await product.save()

      if(product.price)price += product.price * item.quantity

      await TransactionsProducts.create({
        transactionId: transaction.id,
        productId: item.id,
        quantity: item.quantity
      }, { client: trx })

    }

    transaction.value = price
    await transaction.save()

   


    let activeGateways: { name: string; priority: number }[] = []

      // Pegar keys do Redis
    const keys = await redis.keys('gateway:*')

      // Ler valores do Redis
    if (keys.length) {
        const values = await Promise.all(keys.map(key => redis.get(key)))
        activeGateways = values
          .filter(Boolean) // remove nulls
          .map(v => JSON.parse(v!))
      }

      // Se não houver no Redis, buscar no banco
    if (!activeGateways.length) {
        activeGateways = (await Gateways.query()
          .where('is_active', true)
          .select('name', 'priority'))
          .map(g => ({
            name: g.name,
            priority: g.priority ?? 0
          }))
        
        // Salvar no Redis para cache
      for (const gateway of activeGateways) {
          await redis.set(`gateway:${gateway.name}`, JSON.stringify(gateway)) // expira 1h
        }
      }


    
   const manager = gatewayManagerFactory(activeGateways)

    data.payment.price = price

    

    const result = await manager.payment(data.payment)

    if (result.id) {
      await trx.commit()
      transaction.status = 'approved'
      transaction.gateway.name = result.gatewayName
      transaction.externalId = result.id
     await transaction.save()
      
      return result
    }

    await trx.rollback()
    throw new Error("Payment failed")

  } catch (error) {

    await trx.rollback()
    throw error

  }
}





    async listTransactions( cursor?: number, limit = 10) {
       try{   
          limit = Math.min(limit, 50)
          const query = Transactions.query()
               .orderBy('id', 'asc')
               .limit(limit)
               
             if (cursor) {
               query.where('id', '>', cursor)
             }
       
             const products = await query
       
             return {
               data: products,
               nextCursor: products.length
                 ? products[products.length - 1].id
                 : null
             }

       }catch(e){
        throw new Error("" + e)
       }
    } 



     async listTransactionsByUser(client: number, cursor?: number, limit = 10) {
          
      try {
            // garante um limite máximo
            limit = Math.min(limit, 50)

            // cria o query builder (não colocar await aqui)
            const query = Transactions.query()
              .where('client', client) // filtra pelo cliente
              .orderBy('id', 'asc')
              .limit(limit)

            // adiciona cursor se existir
            if (cursor) {
              query.where('id', '>', cursor)
            }

            // executa a query
            const transactions = await query

            // retorna dados + nextCursor
            return {
              data: transactions,
              nextCursor: transactions.length
                ? transactions[transactions.length - 1].id
                : null
            }

      } catch (e) {
            throw new Error("" + e)
      }
    }



    async refundTransaction(transactionId: number) {
       try{ 

        const transaction =  await Transactions.findByOrFail('id', transactionId)
          
          if(!transaction)throw new Error("Transaction not found")

           const activeGateways = (await Gateways
            .query()
            .where("is_active", true)
            .select("name", "priority"))
            .map(g => ({
              name: g.name,
              priority: g.priority ?? 0
            }))

           const manager = gatewayManagerFactory(activeGateways)
          
           if( transaction.externalId && transaction.gateway) {
              const result = await manager.refundedPayment(transaction.externalId, transaction.gateway.name)
            
              if(result && result.status === 200)transaction.status = "refunded"
              await transaction.save()
           }else{
            throw Error('Transaction not found')
           }


       }catch(e){
        throw Error(""+e)
       }
    }


    async getTransactionDetails(transactionId: number,) {
        try{ 
          const transaction = await Transactions.find(transactionId)
            if (!transaction) return null

            await transaction.load('itens')
            await transaction.load('gateway')
          return transaction
        }catch(e){
          throw Error("erro em carregar query"+e)
        }
    }


      async getTransactionDetailByUser(transactionId: number, userId: number) {
            try{ 
          const transaction = await Transactions.query().where('client', userId).where('id', transactionId).preload('itens').preload('gateway').first()
            if (!transaction) return null
          return transaction
        }catch(e){
          throw Error("erro em carregar query"+e)
        }
    }


  

}