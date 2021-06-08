import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { StaticData } from 'src/app/models/StaticData';
import * as StaticDataActions from './static-data.actions';

export const staticDataFeatureKey = 'staticData';

export interface State extends StaticData {
  error: any
}

export const initialState: State = {
  items: [],
  itemGroups: [],
  ingredients: [],
  ingredientTypes: [],
  drinks: [],
  drinkTypes: [],
  desserts: [],
  sides: [],
  error: undefined
};


export const reducer = createReducer(
  initialState,

  on(StaticDataActions.loadStaticDataSuccess, (state, action) => ({
    ...state,
    items: action.data.items,
    itemGroups: action.data.itemGroups,
    ingredients: action.data.ingredients,
    ingredientTypes: action.data.ingredientTypes,
    drinks: action.data.drinks,
    drinkTypes: action.data.items,
    desserts: action.data.desserts,
    sides: action.data.sides,
  })),
  on(StaticDataActions.loadStaticDataFailure, (state, action) => state),
  on(StaticDataActions.loadStaticDataFailure, (state, action) => ({
    ...state, error: action.error
  }))
)
