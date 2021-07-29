import { CartItems } from "./Item";
import { Payments } from "./Payment";

export interface Order {
  id: string
  items: CartItems
  total: string
  status: OrderStatus
  payments?: Payments
  user?: string
  received?: string
  completed?: string
}

export type Orders = Order[]

export type OrderStatus = "none" | "Pending Payment" | "Paid" | "Making" | "Ready" | "Delivered"
