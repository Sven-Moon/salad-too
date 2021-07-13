import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartItem, CartItems } from 'src/app/models/Item';
import { selectCartItems } from '../../order/state/cart/cart.selectors';
import * as fromPay from './pay.reducer';

export const selectPayState = createFeatureSelector<fromPay.State>(
  fromPay.payFeatureKey
);

export const selectItemsByOwner = createSelector(
  selectCartItems,
  (items) => {
    let itemsByOwner: { [key: string]: CartItems }
    items.forEach(item => {
      if (!itemsByOwner[item.owner.name]) {
        itemsByOwner[item.owner.name] = []
      }
      itemsByOwner[item.owner.name].push(item)
    }
    )

  }
)
