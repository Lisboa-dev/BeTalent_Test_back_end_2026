import axios,{  AxiosInstance, AxiosResponse } from 'axios'
import {BasePaymentGateway, AdapterGateway} from '../baseGateway.ts'
import { InputGatewayDTO} from '../interfaces/paymentsAdapter.ts'
import {LoginGateway2,  CreatePaymentGateway2} from '../interfaces/gateway2.ts'
import {PaymentResultDTO} from '../interfaces/paymentsAdapter.ts'






export class AdapterGateway2 extends AdapterGateway{

     to_provider<CreatePaymentGateway2>(data:InputGatewayDTO){
        return {
            nome:data.name,
            email:data.email,
            numeroCartao:data.cardNumber,
            valor:data.value,
            cvv:data.cvv
        } as CreatePaymentGateway2
     }


   
}






export  class Gateway2 extends BasePaymentGateway{
    public name:string = ''
    private axios:AxiosInstance
    constructor(){
        super()
        this.axios = axios.create({baseURL:'http://localhost:3002',  headers: {
        'Content-Type': 'application/json',
      }})
    }

    async login(data:LoginGateway2){
        
      this.axios.defaults.headers.common['Gateway-Auth-Token'] = 'tk_f2198cc671b5289fa856'
       this.axios.defaults.headers.common['Gateway-Auth-Secret'] = '3d15e8ed6131446ea7e3456728b1211f'
        
        return
    
   } 

   async createPayment(data: InputGatewayDTO): Promise<PaymentResultDTO>{
       try{
        const request = new AdapterGateway2().to_provider(data)
        const response = await this.axios.post('/transacoes', request)
          console.log("gateway2 output ", response.data)
        return {message:response.data, status:response.status, id:response.data.id}
      }catch(e){
        throw Error('erro na criação de payment:'+e)
      }
       
    }

   async  refundPayment(paymentId: string): Promise<AxiosResponse>{
        const data = {
            id: paymentId
        }
       const response = await this.axios.post('/transacoes/reembolso', data)
        return response
     }


     

    async listPayment():Promise<AxiosResponse[]>{
       return await this.axios.get('/transacoes')
    }

  



}