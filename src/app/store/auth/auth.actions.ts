import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/User';

export const loginAttempt = createAction(
  '[Login Modal] User Log In',
  props<{ username: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Login Modal] User Log In Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Login Modal] User Log In Failure',
  props<{ error: any }>()
);

export const registerUser = createAction(
  '[Login Modal] User Registration',
  props<{
    username: string,
    password: string,
    confirmPassword: string,
    email: string
  }>()
);

export const registerUserSuccess = createAction(
  '[Login Modal] User Registration',
  props<{ user: User }>()
);

export const registerUserFailure = createAction(
  '[Login Modal] User Registration',
  props<{ error: any }>()
);

export const logOut = createAction('[Header] Log out');
