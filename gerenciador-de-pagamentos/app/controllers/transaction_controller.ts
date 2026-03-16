
import TransactionService from '#services/transaction_service'
import {transactionValidator  } from '#validators/transaction'
import {} from '#validators/product'
import {TransactionCreateDTO}from '../types/transactionDTO.ts'
import type { HttpContext } from '@adonisjs/core/http'



export default class TransactionController{
    private transactionService =  new TransactionService()
   async payment({ request, serialize }: HttpContext) {
     let data: TransactionCreateDTO
     const dataValidate = await request.validateUsing(transactionValidator)
     if(!dataValidate.clientId){
       data = { ...dataValidate, email: dataValidate.payment.email, name: dataValidate.payment.name }  as TransactionCreateDTO
     }else{
       data = { ...dataValidate, email: dataValidate.payment.email, name: dataValidate.payment.name }  as TransactionCreateDTO
     }

      const transaction = this.transactionService
      return serialize(await transaction.payment(data))

   }


  async refund({ request }: HttpContext){
   this.transactionService.refundTransaction(request.param('id'))
  }



  async listByUser({ auth, request }: HttpContext){
    if(auth.user){
     await this.transactionService.getTransactionDetailByUser(request.param('id'), auth.user.id)
    }
  }


   
  async show({ params }: HttpContext){
    await this.transactionService.getTransactionDetails(params.id)
  }



   async list({ request }: HttpContext){
       if(request.input('cursor') && request.input('limit'))return await this.transactionService.listTransactions(request.input('cursor'), request.input(''))
       if(request.input('cursor'))return await this.transactionService.listTransactions(request.input('cursor'))
       return await this.transactionService.listTransactions()
   }


   async showByUser({auth, request }: HttpContext){
    if(auth.user){

        if(request.input('cursor')&& request.input('limit')) return await this.transactionService.listTransactionsByUser(auth.user.id, request.input('cursor'), request.input('limit'))
        if(request.input('limit')) return await this.transactionService.listTransactionsByUser(auth.user.id, undefined, request.input('limit'))
        if(request.input('cursor')) return await this.transactionService.listTransactionsByUser(auth.user.id, request.input('cursor'))
        return await this.transactionService.listTransactionsByUser(auth.user.id)
    }
   }
  
  
}
