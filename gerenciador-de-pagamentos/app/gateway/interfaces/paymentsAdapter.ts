
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
      id: string,
			name: string,
			email: string,
			status: string,
			cardNumber: string,
			amount: number
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

