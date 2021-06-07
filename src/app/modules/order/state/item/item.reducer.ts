import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { CartItem, Item } from 'src/app/models/Item';
import * as ItemActions from './item.actions';

export const itemFeatureKey = 'item';

export interface State extends CartItem {
  hidePickContactFlag: boolean
  hideAddContactFlag: boolean

}

export const initialState: State = {
  id: null,
  name: null,
  itemType: null,
  ingredients: [],
  img: null,
  description: null,
  price: null,
  custom: null,
  owner: null,
  hidePickContactFlag: false,
  hideAddContactFlag: false
};


export const reducer = createReducer(
  initialState,

  on(ItemActions.setItemOwner, (state, action) => ({
    ...state, owner: action.id
  })),

  // Item Owner Select
  on(ItemActions.openOwnerPick, (state) => ({
    ...state, hidePickContactFlag: true
  })),
  on(ItemActions.openAddContact, (state) => ({
    ...state, hideAddContactFlag: true
  })),
  on(ItemActions.closeOwnerPick, (state) => ({
    ...state, hidePickContactFlag: false
  })),
  on(ItemActions.closeAddContact, (state) => ({
    ...state, hideAddContactFlag: false
  })),


);

