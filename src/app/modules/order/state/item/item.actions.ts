import { createAction, props } from '@ngrx/store';

export const setItemOwner = createAction(
  '[Owner Pick] Set Item Owner', props<{ id: string }>()
);

export const openOwnerPick = createAction('[Owner] Open Owner Pick');

export const openAddContact = createAction('[Owner] Open Add Contact');

export const closeOwnerPick = createAction('[Owner] Close Owner Pick');

export const closeAddContact = createAction('[Owner] Close Add Contact');










export const loadItems = createAction(
  '[Item] Load Items'
);

export const loadItemsSuccess = createAction(
  '[Item] Load Items Success',
  props<{ data: any }>()
);

export const loadItemsFailure = createAction(
  '[Item] Load Items Failure',
  props<{ error: any }>()
);
