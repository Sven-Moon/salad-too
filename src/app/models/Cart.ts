import { CartItems } from "./Item";

export interface Cart {
  items: CartItems
  total: string
  itemCount: number
}
