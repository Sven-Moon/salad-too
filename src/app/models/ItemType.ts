export type ItemType = "salad" | "sandwich" | "drink" | "dessert" | "side"

export interface Sandwich {
  id: string
}

export interface Salad {
  id: string
}

export interface Drink {
  id: string
  name: string
  type: string
  image: string
}

export type Drinks = Drink[]

export interface DrinkType {
  id: string
  price: string
}

export type DrinkTypes = DrinkType[]

export interface Side {
  id: string
  name: string
  price: string
  image: string
}

export type Sides = Side[]

export interface Dessert {
  id: string
  name: string
  image: string
  price: string
}

export type Desserts = Dessert[]
