import { createAction, props } from '@ngrx/store';
import { Item } from 'src/app/models/Item';
import { ItemGroup } from 'src/app/models/ItemGroup';
import { Contact, User } from 'src/app/models/User';

export const setItemOwner = createAction(
  '[Owner Pick] Set Contact as Item Owner', props<{ contact: Contact }>()
);

export const setCurrentOwnerAsItemOwner = createAction(
  '[Type Select] Set Last (current) Owner as Item Owner', props<{ owner: Contact }>()
);

export const setUserAsOwner = createAction(
  '[Owner Pick] Set User as Item Owner', props<{ user: User }>()
);

export const openOwnerPick = createAction('[Owner Pick] Open Owner Pick');

export const openAddContact = createAction('[Owner Add] Open Add Contact');

export const closeOwnerPick = createAction('[Owner Pick] Close Owner Pick');

export const closeAddContact = createAction('[Owner Add] Close Add Contact');

export const setItemGroup = createAction(
  '[Item Type Select] Set Item Type',
  props<{ itemGroup: string }>()
);

export const clearItemGroup = createAction('[Item Select] Clear Item Group');

export const setItemId = createAction(
  '[Item Select] Set Item Id (from user selection)',
  props<{ id: string }>()
);

export const loadItem = createAction(
  '[Item Select] Set Item Properties',
  props<{ item: Item }>()
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
