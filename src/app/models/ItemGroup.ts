import { Item } from "./Item"

export type ItemGroup = {
  id: string
  name: string
  img: string
}

export interface Sandwich extends Item {
}

export type Sandwiches = Sandwich[]

export interface Salad extends Item {
}

export type Salads = Salad[]

export type ItemGroups = ItemGroup[]

export interface Sandwich {
  id: string
}

export interface Salad {
  id: string
}

export interface Drink extends Item {
}

export type Drinks = Drink[]

export interface DrinkType {
  id: string
  price: string
}

export type DrinkTypes = DrinkType[]

export interface Side extends Item {
}

export type Sides = Side[]

export interface Dessert extends Item {
}

export type Desserts = Dessert[]
