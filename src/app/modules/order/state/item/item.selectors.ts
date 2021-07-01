import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Ingredient, Ingredients, IngredientType, IngredientTypes } from 'src/app/models/Ingredient';
import { CartItem, Item, Items } from 'src/app/models/Item';
import { DrinkTypes, ItemGroup, ItemGroups } from 'src/app/models/ItemGroup';
import { Contact } from 'src/app/models/User';
import { selectDrinkTypes, selectIngredients, selectIngredientTypes, selectAllItems, selectStaticDataState } from '../staticData/static-data.selectors';
import * as fromItem from './item.reducer';

export const selectItemState = createFeatureSelector<fromItem.State>(
  fromItem.itemFeatureKey
);

export const selectCurrentItem = createSelector(
  selectItemState,
  (state): CartItem => {
    let item: CartItem = {
      id: state.id,
      name: state.name,
      itemGroup: state.itemGroup,
      img: state.img,
      ingredients: state.ingredients,
      price: state.price,
      type: state.type,
      owner: state.owner,
      quantity: "1"
    }
    return item
  }
)

export const selectItemGroupPicked = createSelector(
  selectItemState,
  (state: Item): string => state.itemGroup
)

export const selectItemsOfGroup = createSelector(
  selectAllItems,
  selectItemGroupPicked,
  (allItems: Items, group: string): Items => {
    let itemsOfGroup: Items
    itemsOfGroup = allItems.filter(item =>
      item.itemGroup === group
    )
    return itemsOfGroup
  }
)

export const selectItemsWithPrice = createSelector(
  selectItemGroupPicked,
  selectItemsOfGroup,
  selectIngredients,
  selectIngredientTypes,
  selectDrinkTypes,
  (group: string, groupItems: Items, ingredients: Ingredients, ingredientTypes: IngredientTypes, drinkTypes: DrinkTypes) => {
    let itemsWithPrice: Items = []
    if (group === 'salad' || group === 'sandwich') {
      // for each item
      groupItems.forEach(item => {
        let itemPrice: number = 0
        let newItem: Item = Object.assign({}, item)
        // get each ingredient
        item.ingredients.forEach((itemIngredient: string) => {
          let ingredientType = ingredients.find(ingredientRef =>
            // return the ingredient type (string)
            ingredientRef.id === itemIngredient
          ).type
          // use that to return the type
          let ingredientPrice: string
          ingredientTypes.forEach(knownType => {
            if (knownType.id === ingredientType) {
              ingredientPrice = knownType.price
            }
          })
          itemPrice = itemPrice + +ingredientPrice

          newItem.price = itemPrice.toFixed(2).toString()
        })
        itemsWithPrice.push(newItem)
      })
      return itemsWithPrice
    } else if (group === 'drink') {
      groupItems.forEach(item => {
        let drink: Item = Object.assign({}, item)
        drink.price = drinkTypes.find(drinkType =>
          drinkType.id === drink.type).price
        itemsWithPrice.push(drink)
      })
      return itemsWithPrice
    } else return groupItems
  }
)

export const selectItemId = createSelector(
  // eg: ham_sourdough
  selectItemState,
  (state): string => state.id
)

export const selectPickedItem = createSelector(
  selectAllItems,
  selectItemId,
  (allItems: Items, id: string): Item => {
    let foundItem: Item = fromItem.initialState
    allItems.forEach(item => {
      if (item.id === id) {
        foundItem = item
      }
    })
    return foundItem
  }
)

export const selectItemOwner = createSelector(
  selectItemState,
  (state): Contact => state.owner
)

export const selectItemIngredients = createSelector(
  selectItemState,
  selectIngredients,
  (item, ingredients: Ingredients): Ingredients => {
    let ingredientList: Ingredients = []
    if (item && item.ingredients) {
      item.ingredients.forEach(id =>
        ingredientList.push(ingredients.find(ingredient =>
          ingredient.id === id))
      )
    }
    return ingredientList
  }
)

export const selectPickedIngredientTypeId = createSelector(
  selectItemState,
  (state) => state.pickedIngredientTypeId
)

export const selectPickedIngredientType = createSelector(
  selectIngredientTypes,
  selectPickedIngredientTypeId,
  (ingredientTypes: IngredientTypes, pickedType: string): IngredientType =>
    ingredientTypes.find(ingredientType =>
      ingredientType.id === pickedType
    )
)

export const selectFilteredIngredientsByType = createSelector(
  // Ingredients of Selected type
  selectIngredients,
  selectPickedIngredientType,
  (ingredients: Ingredients, selectedType: IngredientType): Ingredients => {
    if (selectedType) {
      let ingredientList: Ingredients = []
      ingredientList = ingredients.filter(ingredient =>
        ingredient.type === selectedType.id
      )
      return ingredientList
    } else { return ingredients }
  }
)
