import { createAction, props } from '@ngrx/store';
import { ItemsByOwner } from 'src/app/models/Item';
import { CreditInfo, Payment } from 'src/app/models/Payment';
import { Contacts } from 'src/app/models/Contact';

// ============ Pay Choose ============
export const updateItemsByOwner = createAction(
  '[Pay Choose] Update Items by Owner',
  props<{
    entities: ItemsByOwner,
    // note ids is a CONTACT: id is contact.email
    ids: Contacts
  }>()
)

export const updateItemOwners = createAction(
  '[Pay Choose] Update Item Owners (ItemsByOwner keys)',
  props<{ payload: Contacts }>()
)

// export const updateIsSelected = createAction(
//   '[Pay Choose] Update Owner Selected Status',
//   props<{ id: string, selected: boolean }>()
// )

// export const updatePayment = createAction(
//   '[Pay Choose] Update Payment',
//   props<{ payment: Payment }>()
// )


// ============ Pay Info ============
export const updateCcInfo = createAction(
  '[Pay Info] Update CC Info',
  props<{ ccInfo: CreditInfo }>()
)

export const createTransactionId = createAction(
  '[Pay Info] Create Transaction ID',
  props<{ id: string }>()
);

export const attemptPayment = createAction(
  '[Pay Info] Attempt Payment',
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

export const updatePaymentStatus = createAction(
  '[Payment Success Effect] Update Transaction Status',
  props<{
    status: string
  }>()
);

export const updateTransactionNumber = createAction(
  '[Pay Success (Effect)] Update Transaction Number',
  props<{ id: string }>()
);

