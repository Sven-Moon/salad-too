import { Ingredients } from "./Ingredient";
import { ItemGroup } from "./ItemGroup";
import { Contact } from "./User";

export interface Item {
  id: string
  name: string
  itemGroup: string
  img: string
  ingredients?: string[]
  description?: string
  price?: string
  type?: string
  owner?: Contact
}

export type Items = Item[]

export interface CartItem extends Item {
  lastOwner?: Contact
  price: string
  quantity: number
}
export type CartItems = CartItem[]

