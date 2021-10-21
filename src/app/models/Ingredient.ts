
export interface Ingredient {
  id: string
  name: string
  ingredientType: string
  img: string
  itemGroups: string[]
  price?: string
}

export type Ingredients = Ingredient[]

export interface IngredientType {
  id: string
  name: string
  price: string
  selectType: 'single' | 'multiple'
  img: string
}

export type IngredientTypes = IngredientType[]
