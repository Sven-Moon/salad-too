import { createAction, props } from '@ngrx/store';
import { ItemsByOwner } from 'src/app/models/Item';
import { Contact, Contacts } from 'src/app/models/User';

export const updateItemsByOwner = createAction(
  '[Pay] Update Items by Owner',
  props<{
    entities: ItemsByOwner,
    // note ids is a CONTACT: id is contact.email
    ids: Contacts
  }>()
)

export const updateItemOwners = createAction(
  '[Pay] Update Item Owners (ItemsByOwner keys)',
  props<{ payload: Contacts }>()
)

export const updateIsSelected = createAction(
  '[Pay] Update Owner Selected Status',
  props<{ id: string, selected: boolean }>()
)

export const attemptPayment = createAction(
  '[Pay] Payment Pays'
);

export const paymentSuccess = createAction(
  '[Pay] Payment Pays Success',
  props<{ data: any }>()
);

export const paymentFailure = createAction(
  '[Pay] Payment Pays Failure',
  props<{ error: any }>()
);
