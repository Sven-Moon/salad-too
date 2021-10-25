import { Ingredients, IngredientTypes } from "./Ingredient";
import { Items } from "./Item";
import { DrinkTypes, ItemGroups, Sides } from "./ItemGroup";
import { Users } from "./User";
import { Contacts } from "./Contact";

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
