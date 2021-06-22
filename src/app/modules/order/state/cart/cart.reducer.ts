import { Action, createReducer, on } from '@ngrx/store';
import { Contact } from 'src/app/models/User';
import * as CartActions from './cart.actions';

export const cartFeatureKey = 'cart';

export interface State {
  currentOwner: Contact

}

export const initialState: State = {
  currentOwner: {
    name: null,
    img: null,
    email: null
  }
};


export const reducer = createReducer(
  initialState,

  on(CartActions.setUserAsCurrent, (state, action) => ({
    ...state, currentOwner: {
      name: action.data.name,
      img: action.data.img,
      email: action.data.email
    }
  })),
  on(CartActions.loadCarts, state => state),
  on(CartActions.loadCartsSuccess, (state, action) => state),
  on(CartActions.loadCartsFailure, (state, action) => state),

);

