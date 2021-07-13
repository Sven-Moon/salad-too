import { createReducer, on } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';
import { Item } from 'src/app/models/Item';
import * as ItemActions from './item.actions';

export const itemFeatureKey = 'item';

export interface State extends Item {
  pickedIngredientTypeId: string
  quantity?: number
}

export const initialState: State = {
  id: null,
  name: null,
  itemGroup: null,
  ingredients: [],
  img: null,
  description: null,
  price: null,
  owner: null,
  pickedIngredientTypeId: null
};


export const reducer = createReducer(
  initialState,

  // =============== Item Owner ===============
  on(ItemActions.setItemOwner, (state, action) => ({
    ...state, owner: {
      email: action.contact.email,
      img: action.contact.img,
      name: action.contact.name
    }
  })),
  on(ItemActions.setLastItemOwnerAsItemOwner, (state, action) => ({
    ...state,
    owner: {
      email: action.owner.email,
      img: action.owner.img,
      name: action.owner.name
    }
  })),
  on(ItemActions.setItemName, (state, action) => ({
    ...state,
    name: action.name
  })),
  // =============== Item Select ===============
  on(ItemActions.setItemGroup, (state, action) => ({
    ...state, itemGroup: action.itemGroup
  })),
  on(ItemActions.clearItemGroup, (state) => ({
    ...state, itemGroup: null
  })),

  // =============== Item Type Select ===============
  on(ItemActions.setItemId, (state, action) => ({
    ...state, id: action.id
  })),
  on(ItemActions.loadItem, (state, action) => {
    if (action.item.id === null) {
      return initialState
    } else return {
      ...state,
      id: action.item.id,
      name: action.item.name,
      itemGroup: action.item.itemGroup,
      ingredients: action.item.ingredients,
      img: action.item.img,
      description: action.item.description,
      price: action.item.price,
    }
  }),
  on(ItemActions.clearItem, (state, action) => (initialState)),
  // =============== CUSTOMIZE ===============

  on(ItemActions.filterIngredientType, (state, action) => ({
    ...state, pickedIngredientTypeId: action.ingredientType
  })),
  mutableOn(ItemActions.toggleIngredient, (state, action) => {
    let index: number = state.ingredients.findIndex(ingredient =>
      ingredient === action.ingredient)
    if (state.ingredients && index != -1) {
      state.ingredients.splice(index, 1)
    } else {
      state.ingredients.push(action.ingredient)
    }
  }),
  mutableOn(ItemActions.deselectAllIngredientsOfType,
    // runs when an ingredient type typeSelect = Single
    // clears the list so the one just selected (to be added after)
    // will be the only ingredient
    (state, action) => {
      let newList: string[] = []
      // for each item ingredient
      state.ingredients.forEach(itemIngredient => {
        let remove: boolean = false
        // compare to each of the items to remove
        action.ingredientsToRemove.forEach(removeItem => {
          // if it's on the list
          if (removeItem == itemIngredient) {
            // mark for removal
            remove = true
          }
        })
        // if not marked for removal, add to list
        if (!remove) { newList.push(itemIngredient) }
      })
      state.ingredients = newList
    }
  ),

  // ======== CART ========
  mutableOn(ItemActions.editCartItem, (state, action) => ({
    ...action.item
  })),
);

