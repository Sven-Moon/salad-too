import { HttpErrorResponse } from '@angular/common/http';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/models/User';
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

/**
 * SignedIn status dependent on two things:
 * 1) is there a user object at all (initial state)
 * 2) does the object have an 'guest...@saladtoo.com' email
 * ... so to sign in a "valid" email must be entered
 */
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
    if (error && error.error) {
      return error.error
    } else { return null }
  }
);
