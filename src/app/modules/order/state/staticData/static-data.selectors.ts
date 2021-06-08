import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemGroups } from 'src/app/models/ItemGroup';
import { StaticData } from 'src/app/models/StaticData';
import * as fromStaticData from './static-data.reducer';

export const selectStaticDataState = createFeatureSelector<fromStaticData.State>(
  fromStaticData.staticDataFeatureKey
);

export const selectItemGroups = createSelector(
  selectStaticDataState,
  (state: StaticData): ItemGroups => state.itemGroups
)

export const selectItems = createSelector(
  selectStaticDataState,
  (state: StaticData): ItemGroups => state.items
)
