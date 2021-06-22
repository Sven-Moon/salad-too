import { createAction, props } from '@ngrx/store';
import { Contact } from 'src/app/models/User';

export const setUserAsCurrent = createAction(
  '[Order (init)] Set User As Item Owner',
  props<{ data: Contact }>()
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
