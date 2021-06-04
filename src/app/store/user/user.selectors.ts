import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Contacts } from 'src/app/models/User';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectUserContacts = createSelector(
  selectUserState,
  (state): string[] => state.contacts
)
