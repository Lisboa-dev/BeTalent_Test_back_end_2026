import {CreatePaymentDTO, PaymentManagerResultDTO} from './interfaces/paymentsAdapter.ts'
import {ListGateways} from './baseGateway.ts'

export default class GatewayManager {
  constructor(private listGateways: ListGateways) {}

  async payment(data: CreatePaymentDTO): Promise<PaymentManagerResultDTO> {
    for (const item of this.listGateways) {
      try {
        await item.gateway.login(item.login)
        const result = await item.gateway.createPayment(data)

        if (result.id) {
          return {id:result.id, gatewayName:item.name, status:result.status, message:'success'}
        }
      } catch (error) {
        console.error(`Gateway ${item.name} failed`)
      }
    }

    throw new Error("All gateways failed")
  }



  async refundedPayment(id:string, gatewayName:string){
      const value = this.listGateways.find(
         item => item.name === gatewayName
       )
     const response = await value?.gateway.refundPayment(id)

     return response

  }

  async listPayment(){
   const data: Record<string, unknown> = {}
  for (const item of this.listGateways) {
    data[item.name] = await item.gateway.listPayment()
  }
  }

    
}