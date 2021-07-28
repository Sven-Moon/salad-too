import { CartItems, Items } from "./Item";
import { OrderStatus } from "./OrderStatus";

export interface Order {
  id: string
  items: CartItems
  total: string
  status: OrderStatus
  user: string
  received: string
  completed: string
}
