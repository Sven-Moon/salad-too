import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPay from './pay.reducer';

export const selectPayState = createFeatureSelector<fromPay.State>(
  fromPay.payFeatureKey
);

export const selectFail = createSelector(
  selectPayState,
  (state:fromPay.State): boolean => state.failFlag
)
