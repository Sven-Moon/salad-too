import { createAction, props } from '@ngrx/store';

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
