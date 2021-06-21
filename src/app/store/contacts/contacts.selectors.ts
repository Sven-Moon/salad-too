import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContacts from './contacts.reducer';

export const selectContactsState = createFeatureSelector<fromContacts.State>(
  fromContacts.contactsFeatureKey
);
