export interface Sandwich {
  id: string
}

export interface Salad {
  id: string
}

export interface Drink {
  [id: string]: {
    name: string
    type: string
    image: string
  }
}

export interface DrinkType {
  [id: string]: {
    price: string
  }
}

export interface Side {
  [id: string]: {
    name: string
    price: string
    image: string
  }
}

export interface Dessert {
  [id: string]: {
    name: string
    image: string
    price: string
  }
}
