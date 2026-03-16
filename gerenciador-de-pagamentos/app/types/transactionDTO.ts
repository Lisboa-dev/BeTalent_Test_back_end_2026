

export interface TransactionCreateDTO {
  payment: Payment,
  products: ProductToTransaction[],
  client?:number,
  email: string,
  name:string,
  idempotency_key: string
}

export interface Payment{
  name: string,
  email: string,
  cardNumber: string,
  cvv: string
  value?:number
}

export interface ProductToTransaction{
    id: number,
    quantity: number
}

