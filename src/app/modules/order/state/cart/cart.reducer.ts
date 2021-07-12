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

  // ======== CART ========
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
  mutableOn(CartActions.duplicateCartItem, (state, action) => {
    state.items.push(action.item)
  }),
  mutableOn(CartActions.clearCart, (state) => ({
    initialState
  })),
  on(CartActions.removeCartItem, (state, action) => (
    {
      ...state,
      items: state.items.filter(item => item.name !== action.name)
    }
  )),
  mutableOn(CartActions.changeCartItemQty, (state, action) => {
    // item has new quantity
    state.items.find(item =>
      item.name === action.item.name
    ).quantity = action.item.quantity
  }),

  // boiler plate
  on(CartActions.loadCarts, state => state),
  on(CartActions.loadCartsSuccess, (state, action) => state),
  on(CartActions.loadCartsFailure, (state, action) => state),

);

