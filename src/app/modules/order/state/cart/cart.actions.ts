import { createAction, props } from '@ngrx/store';
import { CartItem, Item } from 'src/app/models/Item';
import { Contact } from 'src/app/models/Contact';

export const addItemToCart = createAction(
  '[Customize] Add Item To Cart',
  props<{ cartItem: CartItem }>()
)

export const updateLastOwner = createAction(
  '[Login / Owner Select] Update Last Owner',
  props<{ data: Contact }>()
);

export const clearCart = createAction(
  '[Nav / Pay / Cart] Clear Cart'
);

export const duplicateCartItem = createAction(
  '[Cart] Duplicate Cart Item',
  props<{ item: CartItem }>()
);

export const removeCartItem = createAction(
  '[Cart] Remove Cart Item',
  props<{ id: string }>()
);

export const loadCarts = createAction(
  '[Cart] Load Carts'
);

export const loadCartsSuccess = createAction(
  '[Cart] Load Carts Success',
  props<{ data: any }>()
);

export const loadCartsFailure = createAction(
  '[Cart] Load Carts Failure',
  props<{ error: any }>()
);

export const changeCartItemQty = createAction(
  '[Cart] Change Cart Item Quantity',
  props<{ item: CartItem }>()
);

export const updateCartItemOwner = createAction(
  '[Login Successful (Effect)] Update Cart Item Owner',
  props<{ item }>()
)



// --------- PAY -----------
export const removePaidItemsFromCart = createAction(
  // ** search by owner removing all associated items
  '[Payment Success Effect] Remove Paid Items from Cart',
  props<{ ownerEmails: string[] }>()
);
