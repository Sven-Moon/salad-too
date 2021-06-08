
export interface Ingredient {
  id: string
  name: string
  type: string
  image: string
  itemGroup: string[]
}

export type Ingredients = Ingredient[]

export interface IngredientType {
  id: string
  price: string
  selectType: 'single' | 'multiple'
}

export type IngredientTypes = IngredientType[]
