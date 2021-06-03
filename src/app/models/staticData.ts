import { Ingredients, IngredientTypes } from "./Ingredient";
import { Desserts, Drinks, DrinkTypes, Items, Sides } from "./Item";
import { Contacts, Users } from "./User";

export interface staticData {
  items: Items,
  ingredients: Ingredients,
  ingredientTypes: IngredientTypes,
  drinks: Drinks,
  drinkTypes: DrinkTypes,
  desserts: Desserts
  sides: Sides
}

export interface userData {
  users: Users
  contacts: Contacts
}
