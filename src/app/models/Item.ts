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
}

export type Items = Item[]

export interface CartItem extends Item {
  custom: boolean
  owner: Contact
  price: string
}
export type CartItems = CartItem[]

