import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOwner from './owner.reducer';

export const selectOwnerState = createFeatureSelector<fromOwner.State>(
  fromOwner.ownerFeatureKey
);
