import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromItem from './item.reducer';

export const selectItemState = createFeatureSelector<fromItem.State>(
  fromItem.itemFeatureKey
);

export const selectPickOwnerFlag = createSelector(
  selectItemState,
  state => (state.hidePickContactFlag)
)

export const selectAddContactFlag = createSelector(
  selectItemState,
  state => (state.hideAddContactFlag)
)
