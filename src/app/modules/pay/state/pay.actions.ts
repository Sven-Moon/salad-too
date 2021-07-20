import { createAction, props } from '@ngrx/store';
import { ItemsByOwner } from 'src/app/models/Item';
import { CreditInfo, Payment } from 'src/app/models/Payment';
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

export const updatePayment = createAction(
  '[Pay] Update Payment',
  props<{ payment: Payment }>()
)

export const updateCcInfo = createAction(
  '[Pay] Update CC Info',
  props<{ ccInfo: CreditInfo }>()
)

export const createTransactionId = createAction(
  '[Pay] Create Transaction ID',
  props<{ id: string }>()
);

export const attemptPayment = createAction(
  '[Pay] Attempt Payment',
  props<{
    payment: Payment,
    ccInfo: CreditInfo
  }>()
);

export const clearPayment = createAction(
  '[Pay] Clear Payment'
);

export const paymentSuccess = createAction(
  '[Pay] Payment Success',
  props<{ data: Payment }>()
);

export const paymentFailure = createAction(
  '[Pay] Payment Failure',
  props<{ error: any }>()
);

export const updateItemsByOwnerPayStatus = createAction(
  '[Payment Success Effect] Update Paid Status of Items',
  props<{ id: string }>()
);

export const updatePaymentsStatus = createAction(
  '[Payment Success Effect] Update Transaction Status',
  props<{
    id: string,
    status: string
  }>()
);
