import { Items } from "./Item";
import { OrderStatus } from "./OrderStatus";

export interface Order {
  id: string
  items: Items
  total: string
  amountPaid: string
  status: OrderStatus
  user: string
  transactions: string[]
}
