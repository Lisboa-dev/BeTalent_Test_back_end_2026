import axios, { AxiosInstance, AxiosResponse } from 'axios'
import {BasePaymentGateway, AdapterGateway} from '../baseGateway.ts'
import {InputGatewayDTO, PaymentResultDTO} from '../interfaces/paymentsAdapter.ts'
import {CreatePaymentGateway1} from '../interfaces/gateway1.ts'
import { Console } from 'console'
import { isConstructorDeclaration } from 'typescript'


const baseUrl = 'http://localhost:3001'



export class AdapterGateway1 extends AdapterGateway{

      to_provider(data:InputGatewayDTO):CreatePaymentGateway1{
        return  { 
            name:data.name,
            email:data.email,
            cardNumber:data.cardNumber,
            amount:data.value,
            cvv:data.cvv}
     }

}






export  class Gateway1 extends BasePaymentGateway{
    public name:string = ''
     private axios:AxiosInstance
    constructor(){
        super()
        this.axios = axios.create({
             baseURL:'http://localhost:3001',
              headers: {
        'Content-Type': 'application/json',
      },
        })
    }
    async login(data:{}){
       
       const response = await this.axios.post('/login', {
          "email": "dev@betalent.tech",
          "token": "FEC9BB078BF338F464F96B48089EB498"
        })
       
       if(response.data.token){
        this.axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token
         return
       }else{
        throw  Error("login invalido")
       }
   } 

   async createPayment(data: InputGatewayDTO): Promise<PaymentResultDTO>{
     console.log(data)
       try{
        
       const adapter = new AdapterGateway1()
       console.log(adapter.to_provider(data))
       const request = adapter.to_provider(data)
        const response = await this.axios.post(  '/transactions', request)
        console.log("gateway1 output ", response)
        console.log(response)
        return {message:response.data, status:response.status, id:response.data.id}
       }catch (e: any) {
      throw new Error('Erro na criação de payment: ' + (e.response?.data?.message || e.message))
    }
       
    }

   async  refundPayment(paymentId: string): Promise<AxiosResponse>{
       return  await this.axios.post(`/transactions/${paymentId}/charge_back`)
     }

    async listPayment():Promise<AxiosResponse>{
       return  await this.axios.get('/transactions')
    }

  



}