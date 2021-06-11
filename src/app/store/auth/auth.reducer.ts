import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {

}

export const initialState: State = {
  user: {
    id: 'guest123',
    name: 'Guest 123',
    phoneNumber: null,
    email: null,
    contacts: [],
    img: "./assets/images/profile_1.png",
  },
  error: null,
};


export const reducer = createReducer(
  initialState,

  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    user: action.user,
    error: null
  })),
  on(AuthActions.loginFailure, (state, action) => ({
    ...state,
    user: null,
    error: action.error
  })),
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
  on(AuthActions.logOut, (state) => ({
    ...state,
    initialState
  })),

);

