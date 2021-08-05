import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/User';


// ------------ LOG IN / OUT ------------
export const loginAttempt = createAction(
  '[Login Modal] User Log In',
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Login Modal] User Log In Success',
  props<{ user: User }>()
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
    email: string
  }>()
);

export const registerUserSuccess = createAction(
  '[Login Modal] User Registration Success',
  props<{ user: User }>()
);

export const registerUserFailure = createAction(
  '[Login Modal] User Registration Failure',
  props<{ error: any }>()
);

// ------------ INITIAL: GUEST ------------
export const setGuestId = createAction(
  '[App Root] Set Guest ID',
  props<{ id: string }>()
)

// ------------ CONTACTS ------------
export const addContact = createAction(
  '[Owner Add] Add Contact',
  props<{
    name: string,
    email: string,
    img: string
  }>()
);

export const editUserName = createAction(
  '[Account] Edit User Name',
  props<{ name: string }>()
);


// ------------ ACCOUNT ------------
// #region USERNAME -----------------------------
export const updateUserName = createAction(
  '[Account Name Edit Modal] Update User Name',
  props<{
    id: string,
    password: string,
    newUsername: string
  }>()
)

export const updateUserNameSuccess = createAction(
  '[Account Name Edit Modal] Update User Name Success',
  props<{ id: string, name: string }>()
)

export const updateUserNameFailure = createAction(
  '[Account Name Edit Modal] Update User Name Failure',
  props<{ error: any }>()
)
//#endregion username

// #region PASSWORD -----------------------------
export const updatePassword = createAction(
  '[Account Password Edit Modal] Update Password',
  props<{
    id: string,
    password: string,
    newPassword: string
  }>()
)

export const updatePasswordSuccess = createAction(
  '[Account Password Edit Modal] Update Password Success',
  props<{ id: string, name: string }>()
)

export const updatePasswordFailure = createAction(
  '[Account Password Edit Modal] Update Password Failure',
  props<{ error: any }>()
)
//#endregion username

// #region EMAIL -----------------------------
export const updateEmail = createAction(
  '[Account Email Edit Modal] Update Email',
  props<{
    id: string,
    password: string,
    newEmail: string
  }>()
)

export const updateEmailSuccess = createAction(
  '[Account Email Edit Modal] Update Email Success',
  props<{ id: string, email: string }>()
)

export const updateEmailFailure = createAction(
  '[Account Email Edit Modal] Update Email Failure',
  props<{ error: any }>()
)
// #endregion email

// #region PHONE -----------------------------
export const updatePhone = createAction(
  '[Account Phone Edit Modal] Update Phone',
  props<{
    id: string,
    password: string,
    newPhone: string
  }>()
)

export const updatePhoneSuccess = createAction(
  '[Account Phone Edit Modal] Update Phone Success',
  props<{ id: string, phoneNumber: string }>()
)

export const updatePhoneFailure = createAction(
  '[Account Phone Edit Modal] Update Phone Failure',
  props<{ error: any }>()
)
