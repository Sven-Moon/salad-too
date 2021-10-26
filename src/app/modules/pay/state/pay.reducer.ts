import { createReducer, on } from '@ngrx/store';
import { Payment } from 'src/app/models/Payment';
import * as PayActions from './pay.actions'

export const payFeatureKey = 'pay';

export interface State {
  payment: Payment,
  payments: Payment[],
  failFlag: boolean

}

export const initialState: State = {
  payment: {
    orderId: null,
    amount: 0,
    status: null,
    error: null
  },
  payments: [],
  failFlag: false
};


export const reducer = createReducer(
  initialState,
  on(PayActions.toggleFailFlag, (state, action) => ({
    ...state, failFlag: action.flag
  }))
)
