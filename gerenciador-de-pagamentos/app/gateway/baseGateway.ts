import {OutputGatewayDTO,InputGatewayDTO, CreatePaymentDTO, PaymentResultDTO} from './interfaces/paymentsAdapter.ts'

export abstract class AdapterGateway{
    abstract to_provider(data:InputGatewayDTO):any
}




export  abstract class BasePaymentGateway{
   public abstract  name: string
  
   abstract createPayment(data: CreatePaymentDTO): Promise<PaymentResultDTO>

   abstract listPayment(): Promise<any>

    abstract refundPayment(paymentId: string): Promise<any>

    abstract login(data:any):Promise<any>



}

export type ListGateways = {login:{}, gateway:BasePaymentGateway, adapter:AdapterGateway, name:string, priority:number}[]