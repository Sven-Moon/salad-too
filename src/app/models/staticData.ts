import { Ingredient, IngredientType } from "./Ingredient";
import { Item } from "./Item";
import { Dessert, Drink, DrinkType, Side } from "./ItemType";

export interface staticData {
  items: Item,
  ingredients: Ingredient,
  ingredientTypes: IngredientType,
  drinks: Drink,
  drinkTypes: DrinkType,
  desserts: Dessert
  sides: Side
}
