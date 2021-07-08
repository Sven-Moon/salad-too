import { createReducer, on } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';
import { CartItem, CartItems } from 'src/app/models/Item';
import { Contact } from 'src/app/models/User';
import * as CartActions from './cart.actions';

export const cartFeatureKey = 'cart';

export interface State {
  items: CartItems
  lastItemOwner: Contact
}

export const initialState: State = {
  items: [],
  lastItemOwner: {
    name: null,
    img: null,
    email: null
  }
};


export const reducer = createReducer(
  initialState,
  on(CartActions.updateLastOwner, (state, action) => ({
    ...state, lastItemOwner: {
      name: action.data.name,
      img: action.data.img,
      email: action.data.email
    }
  })),
  mutableOn(CartActions.addItemToCart, (state, action) => {
    state.items.push(action.cartItem)
  }),
  mutableOn(CartActions.clearCart, (state) => ({
    initialState
  })),
  on(CartActions.loadCarts, state => state),
  on(CartActions.loadCartsSuccess, (state, action) => state),
  on(CartActions.loadCartsFailure, (state, action) => state),

);

