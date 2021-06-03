import { Items } from "./Item";
import { OrderStatus } from "./OrderStatus";

export interface Order {
  [id: string]: {
    items: Items
    total: string
    status: OrderStatus
  }
}
