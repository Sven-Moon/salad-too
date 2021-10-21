import { Ingredients } from "./Ingredient";
import { ItemGroup } from "./ItemGroup";
import { Contact } from "./User";

export interface Item {
  id: string
  name: string
  itemGroup: string // salad, sandwitch, etc.
  img: string
  ingredients?: string[]
  description?: string
  price?: string
  ingredientType?: string // itemGroup subtype: eg juice (kind of drink)
  owner?: Contact,
  quantity?: number
}

export type Items = Item[]


export interface CartItem extends Item {
  lastOwner?: Contact
  price: string
  quantity: number
}
export type CartItems = CartItem[]


export interface ItemsByOwner {
  [key: string]: {
    owner: Contact
    items: CartItems,
    total: number,
    isSelected: boolean,
    payStatus: string,
  }
}
