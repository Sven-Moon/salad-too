import { Action, createReducer, on } from '@ngrx/store';
import * as PayActions from './pay.actions';

export const payFeatureKey = 'pay';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(PayActions.paymentSuccess, (state, action) => state),
  on(PayActions.paymentFailure, (state, action) => state),

);

