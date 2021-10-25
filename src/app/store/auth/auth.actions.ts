import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthResp } from 'src/app/models/Auth';
import { Contact, Contacts, User } from 'src/app/models/User';


// ------------ LOG IN / OUT ------------
export const loginAttempt = createAction(
  '[Login Modal] User Log In',
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Login Modal] User Log In Success',
  props<{ resp: AuthResp }>()
);

export const loginFailure = createAction(
  '[Login Modal] User Log In Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Nav] Log out');

// ------------ REGISTRATION ------------
export const registerUser = createAction(
  '[Login Modal] User Registration',
  props<{
    username: string,
    email: string,
    password: string
  }>()
);

export const registerUserSuccess = createAction(
  '[Login Modal] User Registration Success',
  props<{ resp: AuthResp }>()
  );

  export const registerUserFailure = createAction(
    '[Login Modal] User Registration Failure',
    props<{ error: HttpErrorResponse }>()
    );

// ------------ INITIAL: GUEST ------------
export const setGuestId = createAction(
  '[App Root] Set Guest ID',
  props<{ id: string }>()
)

//#region CONTACTS ------------
export const addContact = createAction(
  '[Owner Add/Account] Add Contact',
  props<{
    name: string,
    email: string,
    img: string
  }>()
);

export const addContactSuccess = createAction(
  '[API] Add Contact Success',
  props<{contact: Contact }>()
);

export const addContactFailure = createAction(
  '[API] Add Contact Failure',
  props<{ error: any }>()
);

export const deleteContact = createAction(
  '[Account] Delete Contact',
  props<{ email: string }>()
);

export const deleteContactSuccess = createAction(
  '[API] Add Contact Success',
  props<{ email: string }>()
);

export const deleteContactFailure = createAction(
  '[API] Add Contact Failure',
  props<{ error: any }>()
);



  //#endregion CONTACTS ------------



// #endregion new contact

export const resetAuthError = createAction(
  '[Login Modal] Reset Errors on Component Teardown'
);

export const updateUser = createAction(
  '[Account] Update User',
  props<{
    user: User,
    oldValue: string,
    newValue: string,
    field: string,
    password: string
  }>()
)

export const updateUserSuccess = createAction(
 '[Account] Update User Success',
 props<{
  user: User, oldValue: string,
  newValue: string, field: string
}>()
);

export const updateUserFailure = createAction(
 '[Account] Update User Failure',
 props<{ error: any}>()
);

export const alertUserUpdated = createAction(
 '[Account] Update User Failure',
 props<{ oldValue: string,
  newValue: string, field: string}>()
);

