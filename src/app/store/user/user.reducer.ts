import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/User';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface State extends User {

}

export const initialState: State = {
  "id": "abc100",
  "name": "Guest",
  "phoneNumber": "",
  "email": "",
  "contacts": [],
  "profileImage": "./assets/images/profile_1.png",
  "signedIn": false
};


export const reducer = createReducer(
  initialState,

  on(UserActions.loadUsers, state => state),
  on(UserActions.loadUsersSuccess, (state, action) => state),
  on(UserActions.loadUsersFailure, (state, action) => state),

);

