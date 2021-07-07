import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromShared from './shared.reducer';

export const selectSharedState = createFeatureSelector<fromShared.State>(
  fromShared.sharedFeatureKey
);

export const selectNavPointer = createSelector(
  selectSharedState,
  (state) => state.navPointer
)

export const selectAlert = createSelector(
  selectSharedState,
  (state) => state.alert
)
