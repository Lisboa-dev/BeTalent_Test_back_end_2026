
export interface PaymentResultDTO{
  status:number,
  message:string,
  id:string
}
export interface CreatePaymentDTO{}

export interface listPaymentDTO{
  status:number,
  message:string,
  data: OutputGatewayDTO[]
}
export interface InputGatewayDTO{
			name: string,
			email: string,
			cardNumber: string,
			value: number
      cvv:string
}


export interface OutputGatewayDTO{
			id: string,
			name: string,
			email: string,
			status: string,
			card_first_digits: string,
			card_last_digits: string,
			amount: number
  }

  export interface PaymentManagerResultDTO{
      status:number,
      message:string,
      id: string,
      gatewayName: string
  }
