import { createReducer, on } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';
import { CartItem, CartItems, Items } from 'src/app/models/Item';
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
  on(CartActions.duplicateCartItem, (state, action) => {
    let newArray: CartItems = []
    state.items.forEach(item => newArray.push(item))
    newArray.push(action.item)
    return { ...state, items: newArray }
  }),
  mutableOn(CartActions.clearCart, (state) => ({
    ...initialState
  })),
  on(CartActions.removeCartItem, (state, action) => (
    {
      ...state,
      items: state.items.filter(item => item.id !== action.id)
    }
  )),
  mutableOn(CartActions.changeCartItemQty, (state, action) => {
    // item has new quantity
    state.items.find(item =>
      item.name === action.item.name
    ).quantity = action.item.quantity
  }),

  // --------- PAY ---------
  on(CartActions.removePaidItemsFromCart, (state, action) => {
    // filter items with owner matching paid from transaction
    let newArray: CartItems = []
    state.items.forEach(item => {
      action.ownerEmails.forEach(email => {
        // remove if emails match (or don't add)
        if (item.owner.email !== email) {
          newArray.push(item)
        }
      })
    })
    return {
      ...state,
      items: newArray
    }
  }),

  // boiler plate
  on(CartActions.loadCarts, state => state),
  on(CartActions.loadCartsSuccess, (state, action) => state),
  on(CartActions.loadCartsFailure, (state, action) => state),

);

