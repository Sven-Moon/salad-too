export interface Payment {
  id: string,
  amount: number,
  status: string,
  ownerSet: string[],
  ccInfo: CreditInfo,
}

export type Payments = Payment[]

export interface payResponse {
  id: string
  amount: string
  status: string
  error: string
  cc4: string
}

export interface CreditInfo {
  name: string
  ccNum: string
  exp: string
  cvv: string
}
