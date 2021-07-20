import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartItem, CartItems, ItemsByOwner } from 'src/app/models/Item';
import { Contact, Contacts } from 'src/app/models/User';
import { selectCartItems } from '../../order/state/cart/cart.selectors';
import * as fromPay from './pay.reducer';

export const selectPayState = createFeatureSelector<fromPay.State>(
  fromPay.payFeatureKey
);

export const selectItemOwnersFromCart = createSelector(
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

export const selectItemsByOwnerFromCart = createSelector(
  selectCartItems,
  (items): ItemsByOwner => {
    let itemsByOwner: ItemsByOwner = {}
    items.forEach(item => {
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

export const selectItemOwners = createSelector(
  selectPayState,
  (state): Contacts => state.itemOwners
)

export const selectItemsByOwner = createSelector(
  selectPayState,
  (state): ItemsByOwner => state.itemsByOwner
)



export const selectUserPayTotal = createSelector(
  selectItemOwners,
  selectItemsByOwner,
  (ids: Contacts, entities: ItemsByOwner): number => {
    let agTotal: number = 0
    ids.forEach(id => {
      if (entities[id.email].isSelected) {
        agTotal += entities[id.email].total
      }
    });
    return agTotal
  }
)

export const selectPayment = createSelector(
  selectPayState,
  (state) => state.payment
)

export const selectPayments = createSelector(
  selectPayState,
  (state) => state.payments
)
