import { Ingredients, IngredientTypes } from "./Ingredient";
import { Items } from "./Item";
import { Desserts, Drinks, DrinkTypes, ItemTypes, Sides } from "./ItemType";
import { Contacts, Users } from "./User";

export interface StaticData {
  items: Items,
  itemTypes: ItemTypes,
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
