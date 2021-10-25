import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartItems, ItemsByOwner } from 'src/app/models/Item';
import { Contact, Contacts } from 'src/app/models/Contact';
import { selectContacts, selectUser } from 'src/app/store/auth/auth.selectors';
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

export const selectCartCount = createSelector(
  selectCartState,
  (state): number => {
    let count: number = 0
    if (state.items) {
      state.items.forEach(item =>
        count += item.quantity
      )
    }
    return count
  }
)

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
      if (!itemsByOwner[item.owner.email]) {
        itemsByOwner[item.owner.email] = {
          owner: item.owner,
          items: [],
          total: 0,
          isSelected: false,
          payStatus: 'unpaid'
        }
      }
      itemsByOwner[item.owner.email].items.push(item)
      itemsByOwner[item.owner.email].total += item.quantity * +item.price
    }
    )
    return itemsByOwner
  }
)

export const selectCartTotal = createSelector(
  selectItemOwners,
  selectItemsByOwner,
  (owners, items): number => {
    let cartTotal: number = 0
    if (owners) {
      owners.forEach(owner =>
        cartTotal += items[owner.email].total
      )
    }
    return cartTotal
  }
)

export const selectCartItemsIds = createSelector(
  selectCartItems,
  (items: CartItems): string[] => {
    return items.map(item => item.id)
  }
);

export const selectPossibleItemOwners = createSelector(
  selectContacts,
  selectUser,
  (contacts: Contacts, user: Contact): Contacts => {
    if (contacts === null) { return [] }
    let allOwners: Contacts = [user]
    contacts.forEach(contact => allOwners.push(contact))
    return allOwners
  }
);
