import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';
import { User } from 'src/app/models/User';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: User
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
  userExists: true,
  error: null,
};


export const reducer = createReducer(
  initialState,

  // --------LOG IN / OUT ------------
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    user: action.user,
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
  on(AuthActions.checkRegisteredSuccess, (state, action) => ({
    ...state,
    userExists: action.exists
  })),
  on(AuthActions.checkRegisteredFailure, (state, action) => ({
    ...state,
    error: action.error
  })),

  // --------GUEST ------------
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
  mutableOn(AuthActions.addContact, (state: State, action) => {
    state.user.contacts.push({
      name: action.name,
      email: action.email,
      img: action.img
    })
  }),
  on(AuthActions.updateUserName, (state, action) => {
    if (state.user.email === action.id) {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.newUsername
        }
      }
    } else return { ...state }
  }),
  on(AuthActions.updateEmailSuccess, (state, action) => ({
    ...state,
    user: {
      ...state.user,
      email: action.email
    }
  })),
  on(AuthActions.updatePhoneSuccess, (state, action) => {
    if (state.user.email === action.id) {
      return {
        ...state,
        user: {
          ...state.user,
          phoneNumber: action.phoneNumber
        }
      }
    } else return { ...state }
  }),
  mutableOn(AuthActions.addNewContactSuccess, (state, action) => {
    state.user.contacts = action.contacts
  }),

  on(AuthActions.resetAuthError, (state, action) => ({
    ...state, error: null
  }))

);
