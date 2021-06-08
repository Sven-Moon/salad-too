import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Items } from 'src/app/models/Item';
import { selectItems, selectStaticDataState } from '../staticData/static-data.selectors';
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

export const selectItemGroupPicked = createSelector(
  selectItemState,
  state => state.itemGroup
)

export const selectItemsOfType = createSelector(
  selectItems,
  selectItemState,
  (items: Items, state: fromItem.State): Items => {
    let itemsOfType: Items
    let type = state.itemGroup
    itemsOfType = items.filter(item =>
      item.itemGroup === type
    )
    return itemsOfType
  }
)
