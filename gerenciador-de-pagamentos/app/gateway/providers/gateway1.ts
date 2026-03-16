import axios, { AxiosInstance, AxiosResponse } from 'axios'
import {BasePaymentGateway, AdapterGateway} from '../baseGateway.ts'
import {InputGatewayDTO, OutputGatewayDTO, PaymentResultDTO} from '../interfaces/paymentsAdapter.ts'
import {CreatePaymentGateway1} from '../interfaces/gateway1.ts'


const baseUrl = 'http://localhost:3001'



export class AdapterGateway1 extends AdapterGateway{

     to_provider(data:InputGatewayDTO){
        return data
     }

}






export  class Gateway1 extends BasePaymentGateway{
    public name:string = ''
     private axios:AxiosInstance
    constructor(){
        super()
        this.axios = axios.create({
             baseURL:'http://localhost:3001',
        })
    }
    async login(data:{}){
    
       const response = await this.axios.post('/login', data)
       if(response.status==400 || response.data.error){
          this.axios.create({
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${response.data.token}`
            }
          })
         return
       }else{
        throw  Error("login invalido")
       }
   } 

   async createPayment(data: CreatePaymentGateway1): Promise<PaymentResultDTO>{
       try{
        const response = await this.axios.post(  '/transactions', data)

        return {message:response.data, status:response.status, id:response.data.id}
      }catch(e){
        throw Error('erro na criação de payment:'+e)
      }
       
    }

   async  refundPayment(paymentId: string): Promise<AxiosResponse>{
       return  await this.axios.post(`/transactions/${paymentId}/charge_back`)
        
     }

    async listPayment():Promise<AxiosResponse>{
       return  await this.axios.get('/transactions')
    }

  



}