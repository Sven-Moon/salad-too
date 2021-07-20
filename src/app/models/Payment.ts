export interface Payment {
  id: string,
  amount: number,
  status: string,
  error?: null
  ownerSet?: string[]
  cc4?: string
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
