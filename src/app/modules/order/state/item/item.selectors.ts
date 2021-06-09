import { createFeatureSelector, createSelector } from '@ngrx/store';
import { reduce } from 'rxjs/operators';
import { Ingredients, IngredientType, IngredientTypes } from 'src/app/models/Ingredient';
import { Item, Items } from 'src/app/models/Item';
import { DrinkTypes, ItemGroup, ItemGroups } from 'src/app/models/ItemGroup';
import { selectDrinkTypes, selectIngredients, selectIngredientTypes, selectItems, selectStaticDataState } from '../staticData/static-data.selectors';
import * as fromItem from './item.reducer';

export const selectItemState = createFeatureSelector<fromItem.State>(
  fromItem.itemFeatureKey
);

export const selectPickOwnerFlag = createSelector(
  selectItemState,
  state => (state.hidePickContactFlag)
)

export const selectAddContactFlag = createSelector(
  selectItemState,
  state => (state.hideAddContactFlag)
)

export const selectItemGroupPicked = createSelector(
  selectItemState,
  (state: Item): string => state.itemGroup
)

export const selectItemsOfGroup = createSelector(
  selectItems,
  selectItemGroupPicked,
  (items: Items, group: string): Items => {
    let itemsOfGroup: Items
    itemsOfGroup = items.filter(item =>
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
  selectItemState,
  (state): string => state.id
)

export const selectPickedItemProperties = createSelector(
  selectItems,
  selectItemId,
  (items: Items, id: string): Item => items.find(item =>
    item.id === id)

)
