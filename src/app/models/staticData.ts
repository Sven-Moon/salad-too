import { Ingredients, IngredientTypes } from "./Ingredient";
import { Items } from "./Item";
import { DrinkTypes, ItemGroups, Sides } from "./ItemGroup";
import { Contacts, Users } from "./User";

export interface StaticData {
  items: Items,
  itemGroups: ItemGroups,
  ingredients: Ingredients,
  ingredientTypes: IngredientTypes,
  drinkTypes: DrinkTypes
}

export interface userData {
  users: Users
  contacts: Contacts
}
