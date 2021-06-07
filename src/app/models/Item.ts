import { Ingredients } from "./Ingredient";
import { ItemType } from "./ItemType";
import { Contact } from "./User";

export interface Item {
  id: string
  name: string
  itemType: string
  ingredients: string[]
  img: string
  description: string
  price: string
}

export interface CartItem extends Item {
  custom: boolean
  owner: string
}

export type Items = Item[]
