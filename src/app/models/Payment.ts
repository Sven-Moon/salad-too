export interface Payment {
  orderId: string
  transactionId?: string
  amount: number
  status: string
  error?: null
  cc4?: string
  dateTime?: number
}

export type Payments = Payment[]

export interface CreditInfo {
  name: string
  ccNum: string
  exp: string
  cvv: string
}

export interface ccPayment extends CreditInfo {
  id: string,
  amount: number
}
