import { createAction, props } from '@ngrx/store';

export const updateNavPointer = createAction(
  '[anywhere] Update Nav Pointer',
  props<{ pointer: string }>()
)

export const displayAlert = createAction(
  '[anywhere] Display Alert',
  props<{ alertType: string, msg: string, timeout: number }>()
)

export const loadShareds = createAction(
  '[Shared] Load Shareds'
);

export const loadSharedsSuccess = createAction(
  '[Shared] Load Shareds Success',
  props<{ data: any }>()
);

export const loadSharedsFailure = createAction(
  '[Shared] Load Shareds Failure',
  props<{ error: any }>()
);
