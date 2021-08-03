import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/User';

export const updateUserName = createAction(
  '[Account Name Edit Modal] Update User Name',
  props<{ name: string, user: User }>()
)

export const updateUserNameSuccess = createAction(
  '[Account Name Edit Modal] Update User Name Success',
  props<{ name: string }>()
)

export const updateUserNameFailure = createAction(
  '[Account Name Edit Modal] Update User Name Failure',
  props<{ error: any }>()
)


export const loadAccounts = createAction(
  '[Account] Load Accounts'
);

export const loadAccountsSuccess = createAction(
  '[Account] Load Accounts Success',
  props<{ data: any }>()
);

export const loadAccountsFailure = createAction(
  '[Account] Load Accounts Failure',
  props<{ error: any }>()
);
