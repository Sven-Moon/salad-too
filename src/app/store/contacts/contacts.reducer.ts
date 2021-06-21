import { Action, createReducer, on } from '@ngrx/store';
import * as ContactsActions from './contacts.actions';

export const contactsFeatureKey = 'contacts';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(ContactsActions.loadContacts, state => state),
  on(ContactsActions.loadContactsSuccess, (state, action) => state),
  on(ContactsActions.loadContactsFailure, (state, action) => state),

);

