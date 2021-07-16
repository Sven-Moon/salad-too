import { EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';
import { CartItem, ItemsByOwner } from 'src/app/models/Item';
import { Payments } from 'src/app/models/Payment';
import { Contacts } from 'src/app/models/User';
import * as PayActions from './pay.actions';

export const payFeatureKey = 'pay';

export interface State {
  itemsByOwner: ItemsByOwner,
  itemOwners: Contacts,
  payments: Payments
}

export const initialState: State = {
  itemsByOwner: {},
  itemOwners: [],
  payments: []
};


export const reducer = createReducer(
  initialState,

  on(PayActions.updateItemsByOwner, (state, action) => ({
    // note ids is a CONTACT: id is contact.email
    ...state, itemsByOwner: action.entities, itemOwners: action.ids
  })),
  mutableOn(PayActions.updateIsSelected, (state, action) => {
    // note ids is a CONTACT: id is contact.email
    state.itemsByOwner[action.id].isSelected = action.selected
    // = !state.itemsByOwner[action.id].isSelected
  }),
  on(PayActions.paymentSuccess, (state, action) => state),
  on(PayActions.paymentFailure, (state, action) => state),

);

