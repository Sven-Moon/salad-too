import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartItem, CartItems, ItemsByOwner } from 'src/app/models/Item';
import { Payment, Payments } from 'src/app/models/Payment';
import { Contact, Contacts } from 'src/app/models/User';
import { selectCartItems } from '../../order/state/cart/cart.selectors';
import { selectOrderState } from '../../order/state/order/order.selectors';
import * as fromPay from './pay.reducer';

export const selectPayState = createFeatureSelector<fromPay.State>(
  fromPay.payFeatureKey
);

// export const selectPayment = createSelector(
//   selectPayState,
//   (state): Payment => state.payment
// )

// export const selectPayments = createSelector(
//   selectPayState,
//   (state): Payments => state.payments
// )

// export const selectTransactionNumber = createSelector(
//   selectPayState,
//   (state): string => state.payment.id
// )

// export const selectReceipt = createSelector(
//   selectTransactionNumber,
//   (state, transNum): Payments => state.payments
// )
