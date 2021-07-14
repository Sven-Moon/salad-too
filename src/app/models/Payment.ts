export interface Payment {
  id: string,
  amount: number,
  status: string,
  ownerSet: string[]
}

export type Payments = Payment[]
