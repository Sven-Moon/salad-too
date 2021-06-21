import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/User';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface State extends User {
  "signedIn": boolean
  error: any
}

export const initialState: State = {
  "name": "Guest",
  "phoneNumber": "",
  "email": "",
  "contacts": [],
  "img": "./assets/images/profile_1.png",
  "signedIn": false,
  "error": undefined
};


export const reducer = createReducer(
  initialState,

  on(UserActions.loadUsers, state => state),
  on(UserActions.loadUsersSuccess, (state, action) => state),
  on(UserActions.loadUsersFailure, (state, action) => state),

);

