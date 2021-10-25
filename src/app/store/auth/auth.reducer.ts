import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';
import { User } from 'src/app/models/User';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: User
  token: string
  userExists: boolean
  error: any
}

export const initialState: State = {
  user: {
    id: "guest123@saladtoo.com",
    name: 'Guest 123',
    phoneNumber: null,
    email: null,
    contacts: [],
    img: "./assets/images/profile_1.png",
  },
  token: null,
  userExists: true,
  error: null,
};


export const reducer = createReducer(
  initialState,

  // --------LOG IN / OUT ------------
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    token: action.resp.token,
    user: {
      id: action.resp.id,
      name: action.resp.name,
      email: action.resp.email,
      phoneNumber: action.resp.phoneNumber,
      img: action.resp.img,
      contacts: action.resp.contacts
    },
    error: null
  })),
  on(AuthActions.loginFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  mutableOn(AuthActions.logout, (state) => ({
    initialState
  })),

  // --------REGISTRATION ------------
  on(AuthActions.registerUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    error: null
  })),
  on(AuthActions.registerUserFailure, (state, action) => ({
    ...state,
    user: null,
    error: action.error
  })),

  //  -------------------- GUEST
  // sets guest & clears contacts
  on(AuthActions.setGuestId, (state, action) => ({
    ...state,
    user: {
      ...state.user,
      id: 'guest' + action.id + '@saladtoo.com',
      email: 'guest' + action.id + '@saladtoo.com',
      name: 'Guest ' + action.id,
      img: './assets/images/profile_1.png',
      phoneNumber: null,
      contacts: [],
      password: null
    }
  })),
  //  -------------------- gutest
  mutableOn(AuthActions.addContactSuccess, (state: State, action) => {
    state.user.contacts.push(action.contact)
  }),
  mutableOn(AuthActions.deleteContactSuccess, (state: State, action) => {
    state.user.contacts = state.user.contacts.filter(contact =>
      contact.email !== action.id
    )
  }),
  on(AuthActions.resetAuthError, (state, action) => ({
    ...state, error: null
  })),
  on(AuthActions.updateUserSuccess, (state, action) => ({
  ...state, user: action.user
  })),


);
