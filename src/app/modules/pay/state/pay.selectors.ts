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
    items.forEach(item => {
      if (!owners.find(owner => owner.email === item.owner.email))
        owners.push(item.owner)
    })
    return owners
  }
)

export const selectItemsByOwner = createSelector(
  selectCartItems,
  (items): ItemsByOwner => {
    let itemsByOwner: ItemsByOwner = {}
    items.forEach(item => {
      console.log(item.owner)
      if (!itemsByOwner[item.owner.email]) {
        itemsByOwner[item.owner.email] = {
          owner: item.owner,
          items: [],
          total: 0,
          isSelected: false,
          isPaid: false
        }
      }
      itemsByOwner[item.owner.email].items.push(item)
      itemsByOwner[item.owner.email].total += item.quantity * +item.price
    }
    )
    return itemsByOwner
  }
)

export const selectUserPayTotal = createSelector(
  selectItemOwners,
  selectItemsByOwner,
  (ids: Contacts, entities: ItemsByOwner): number => {
    let agTotal: number = 0
    ids.forEach(id => {
      if (entities[id.email].isSelected) {
        console.log('Indiv: ' + entities[id.email].total)
        agTotal += entities[id.email].total
        console.log('AgTotal: ' + agTotal)
      }
    });
    return agTotal
  }
)
