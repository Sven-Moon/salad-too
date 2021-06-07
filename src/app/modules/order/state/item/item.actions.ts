import { createAction, props } from '@ngrx/store';
import { ItemType } from 'src/app/models/ItemType';

export const setItemOwner = createAction(
  '[Owner Pick] Set Item Owner', props<{ id: string }>()
);

export const openOwnerPick = createAction('[Owner Pick] Open Owner Pick');

export const openAddContact = createAction('[Owner Add] Open Add Contact');

export const closeOwnerPick = createAction('[Owner Pick] Close Owner Pick');

export const closeAddContact = createAction('[Owner Add] Close Add Contact');

export const setItemType = createAction(
  '[Item Type Select] Set Item Type',
  props<{ itemType: string }>()
);








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
