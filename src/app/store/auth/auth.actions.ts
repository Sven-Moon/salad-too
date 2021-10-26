import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthResp } from 'src/app/models/Auth';
import { User } from 'src/app/models/User';
import { Contact, Contacts } from 'src/app/models/Contact';


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
    contacts: Contacts
  }>()
);

export const registerUserSuccess = createAction(
  '[Login Modal] User Registration Success',
  props<{ user: AuthResp }>()
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
  props<{ contact: Contact }>()
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
  props<{ id: string }>()
);

export const deleteContactSuccess = createAction(
  '[API] Delete Contact Success',
  props<{ id: string }>()
);

export const deleteContactFailure = createAction(
  '[API] Delete Contact Failure',
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

