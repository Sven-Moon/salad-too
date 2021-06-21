import { createAction, props } from '@ngrx/store';

export const loadContacts = createAction(
  '[Contacts] Load Contacts'
);

export const loadContactsSuccess = createAction(
  '[Contacts] Load Contacts Success',
  props<{ data: any }>()
);

export const loadContactsFailure = createAction(
  '[Contacts] Load Contacts Failure',
  props<{ error: any }>()
);
