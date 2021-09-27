import { HttpErrorResponse } from '@angular/common/http';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Contacts, User } from 'src/app/models/User';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectUser = createSelector(
  selectAuthState,
  (state): User => state.user
)

export const selectError = createSelector(
  selectAuthState,
  (state): HttpErrorResponse => state.error
)

export const selectIsSignedIn = createSelector(
  selectUser,
  (user): boolean => {
    if (!user) { return false }
    else {
      let email = user.email
      const match = /^guest\d+@saladtoo.com$/i.test(email)
      return match
        ? false
        : true
    }
  }
)

export const selectContacts = createSelector(
  selectUser,
  (user) => {
    if (user) {
      return user.contacts
    } else { return [] }
  }
)

export const selectUserEmail = createSelector(
  selectUser,
  (user) => user.email
)

export const selectErrorMessage = createSelector(
  selectError,
  (error: HttpErrorResponse): string => {
    if (error) {
    if (error.error.includes('duplicate id')) {
      return 'Duplicate ID'
    } else {
      return 'Unknown server error'
     }
    } else { return null }
  }
);
