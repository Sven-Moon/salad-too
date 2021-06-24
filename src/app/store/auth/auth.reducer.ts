import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/User';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: User
  error: any
}

export const initialState: State = {
  user: {
    name: 'Guest 123',
    phoneNumber: null,
    email: "guest123@saladtoo.com",
    contacts: [],
    img: "./assets/images/profile_1.png",
  },
  error: null,
};


export const reducer = createReducer(
  initialState,

  // --------LOG IN / OUT ------------
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    user: {
      name: action.user.name,
      phoneNumber: action.user.phoneNumber,
      email: action.user.email,
      contacts: action.user.contacts,
      img: action.user.img
    },
    error: null
  })),
  on(AuthActions.loginFailure, (state, action) => ({
    ...state,
    user: null,
    error: action.error
  })),
  on(AuthActions.logOut, (state) => ({
    ...state,
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

  // --------GUEST ------------
  on(AuthActions.setGuestId, (state, action) => ({
    ...state,
    user: {
      ...state.user,
      email: 'guest' + action.id + '@saladtoo.com',
      name: 'Guest ' + action.id
    }
  })),

  // --------ADD CONTACT ------------
  on(AuthActions.addContact, (state: State, action) => {
    let contactsCopy = state.user.contacts.slice(0)
    contactsCopy.push({
      name: action.name,
      email: action.email,
      img: action.img
    })
    return {
      ...state,
      user: {
        ...state.user,
        contacts: contactsCopy
      }
    }
  }),
);

