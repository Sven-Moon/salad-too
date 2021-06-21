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

export const selectIsSignedIn = createSelector(
  selectUser,
  (user): boolean => {
    let email = user.email
    const match = /^guest\d+@saladtoo.com$/i.test(email)
    return match
      ? false
      : true
  }
)
