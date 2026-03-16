import redis from '@adonisjs/redis/services/main'
import Gateways from "#models/gateways"
import Product from "#models/product";
import Transactions from "#models/transactions";
import TransactionsProducts from "#models/transactions_products";
import db from '@adonisjs/lucid/services/db'
import gatewayManagerFactory from '../gateway/gatewayFactory.ts'
import { TransactionCreateDTO } from "../types/transactionDTO.ts";
import { ClientSchema } from '#database/schema';
import Client from '#models/client';
import { Console } from 'console';



export default class TransactionService {
 
 async payment(data: TransactionCreateDTO) {
  // Verifica se a transação já foi processada (idempotência)
  const existingTransaction = await Transactions
    .query()
    .where('idempotencyKey', data.idempotency_key)
    .first()

  if (existingTransaction) {
    return { message: "Transaction já foi processada", status: "skipped" }
  }

  const trx = await db.transaction()

  try {
    let price = 0

    // Criar cliente se não existir
    if (!data.client) {
      const client = await Client.create({
        email: data.email,
        name: data.name
      })
      data.client = client.id
    }

    // Criar transação
    const transaction = await Transactions.create({
      client: data.client,
      idempotencyKey: data.idempotency_key,
      cardLastNumbers: data.payment.cardNumber.slice(-4),
    })
    transaction.useTransaction(trx)

    // Processar produtos
    for (const item of data.products) {
      let product
      try {
        product = await Product.findOrFail(item.id)
      } catch {
        throw new Error(`Produto ${item.id} não encontrado`)
      }

      if (!product.stock || product.stock < item.quantity) {
        product.status = "not_stock"
        await product.save()
        throw new Error(`Estoque insuficiente para o produto ${item.id}`)
      }

      product.stock -= item.quantity
      await product.save()

      if (product.price) price += product.price * item.quantity

      await (await TransactionsProducts.create({
        transactionId: transaction.id,
        productId: item.id,
        quantity: item.quantity
      })).useTransaction(trx)
    }

    transaction.value = price

    // Buscar gateways ativos do Redis
    let activeGateways: { name: string; priority: number }[] = []
    const keys = await redis.keys('gateway:*')
    if (keys.length) {
      activeGateways = (await Promise.all(keys.map(key => redis.get(key))))
        .filter(Boolean)
        .map(v => {
          const gatewayData = JSON.parse(v!)
          return { ...gatewayData, name: gatewayData.name.toLowerCase().trim() }
        })
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

      for (const gateway of activeGateways) {
        await redis.set(`gateway:${gateway.name}`, JSON.stringify(gateway)) // opcional: expire 1h
      }
    }

    // Processar pagamento via gateway
    const manager = gatewayManagerFactory(activeGateways)
    data.payment.value = price
    const result = await manager.payment(data.payment)

    if (result.id) {
      const gateway = await Gateways.query().where('name', result.gatewayName).first()
      transaction.status = 'approved'
      transaction.gatewayId = gateway?.id ?? null
      transaction.externalId = result.id
      await transaction.save()
      await trx.commit()
      return { status: result.status, message: 'Pagamento aprovado' }
    }

    await trx.rollback()
    throw new Error("Payment failed")

  } catch (e) {
    await trx.rollback()

    // Tratamento detalhado de ModelNotFound
    if (e.name === 'ModelNotFoundException') {
      console.error('Registro não encontrado:', e.message)
      throw new Error(`Registro não encontrado: ${e.message}`)
    }

    console.error('Erro na transação:', e)
    throw e
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