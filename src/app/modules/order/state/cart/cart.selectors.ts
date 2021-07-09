import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartItems } from 'src/app/models/Item';
import { Contact } from 'src/app/models/User';
import * as fromCart from './cart.reducer';

export const selectCartState = createFeatureSelector<fromCart.State>(
  fromCart.cartFeatureKey
);

export const selectLastItemOwner = createSelector(
  selectCartState,
  (state): Contact => state.lastItemOwner
)

export const selectCartItems = createSelector(
  selectCartState,
  (state): CartItems => state.items
)
