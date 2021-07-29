import { EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';
import { CartItem, ItemsByOwner } from 'src/app/models/Item';
import { CreditInfo, Payment, Payments } from 'src/app/models/Payment';
import { Contacts } from 'src/app/models/User';
import * as PayActions from './pay.actions';

export const payFeatureKey = 'pay';

export interface State {

}

export const initialState: State = {
  payment: {
    id: null,
    amount: 0,
    status: null,
    error: null
  },
  payments: []
};


export const reducer = createReducer(
  initialState,

  // on(PayActions.updateItemsByOwner, (state, action) => ({
  //   // note ids is a CONTACT: id is contact.email
  //   ...state, itemsByOwner: action.entities, itemOwners: action.ids
  // })),
  // mutableOn(PayActions.createTransactionId, (state, action) => {
  //   state.payment.id = action.id
  // }),
  // mutableOn(PayActions.updatePayment, (state, action) => {
  //   state.payment = action.payment
  // }),
  // mutableOn(PayActions.attemptPayment, (state, action) => {
  //   state.payments.push(action.payment)
  // }),
  // mutableOn(PayActions.clearPayment, (state, action) => {
  //   state.payment = initialState.payment
  // }),
  // mutableOn(PayActions.paymentSuccess, (state, action) => {
  //   state.payments.find(payment =>
  //     payment.id === action.data.id).status = action.data.status
  // }),
  // mutableOn(PayActions.paymentFailure, (state, action) => {
  //   state.payments.find(payment =>
  //     payment.status === 'pending').status = 'error'
  //   state.payments.find(payment =>
  //     payment.status === 'pending').error = action.error

  // }),
  // // gated by status = 'paid)
  // mutableOn(PayActions.updatePaymentStatus, (state, action) => {
  //   state.payment.status = action.status
  // }),
)
