import { Ingredients } from "./Ingredient";

export interface Item {
  [id: string]: {
    name: string
    itemGroup: ItemGroup
    ingredients: string[]
    img: string,
    description: string
    price: string
    custom: boolean,
  }
}

export type Items = Item[]

export type ItemGroup = "salad" | "sandwich" | "drink" | "dessert" | "side"
