import { Action, createReducer, on } from '@ngrx/store';
import * as ContactsActions from './contacts.actions';
import * as AuthActions from '../auth/auth.actions';
import { Contacts } from 'src/app/models/User';

export const contactsFeatureKey = 'contacts';

export interface State {
  // contacts: Contacts
}

export const initialState: State = {
  // contacts: []
};


export const reducer = createReducer(
  initialState,

  // on(AuthActions.loginSuccess, (state, action) => ({
  //   ...state, contacts: action.user.contacts
  // }),
  // on(ContactsActions.addContact, (state, action) => ({
  //   ...state,

  // })),


  // boilerplate
  // on(ContactsActions.loadContacts, state => state),
  // on(ContactsActions.loadContactsSuccess, (state, action) => state),
  // on(ContactsActions.loadContactsFailure, (state, action) => state),

);

