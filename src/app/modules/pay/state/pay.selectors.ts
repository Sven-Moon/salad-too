import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartItem, CartItems, ItemsByOwner } from 'src/app/models/Item';
import { Contact, Contacts } from 'src/app/models/User';
import { selectCartItems } from '../../order/state/cart/cart.selectors';
import * as fromPay from './pay.reducer';

export const selectPayState = createFeatureSelector<fromPay.State>(
  fromPay.payFeatureKey
);

export const selectItemOwners = createSelector(
  selectCartItems,
  (items): Contacts => {
    let owners: Contact[] = []
    items.forEach(item => owners.push(item.owner))
    return owners
  }
)


export const selectItemsByOwner = createSelector(
  selectCartItems,
  (items): ItemsByOwner => {
    let itemsByOwner: ItemsByOwner
    items.forEach(item => {
      if (!itemsByOwner[item.owner.name]) {
        itemsByOwner[item.owner.name] = {
          owner: item.owner,
          items: [],
          total: 0,
          isSelected: false,
          isPaid: false
        }
      }
      itemsByOwner[item.owner.name].items.push(item)
      itemsByOwner[item.owner.name].total += item.quantity * +item.price
    }
    )
    return itemsByOwner
  }
)
