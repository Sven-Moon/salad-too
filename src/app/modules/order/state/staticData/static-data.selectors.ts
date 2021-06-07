import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemTypes } from 'src/app/models/ItemType';
import { StaticData } from 'src/app/models/StaticData';
import * as fromStaticData from './static-data.reducer';

export const selectStaticDataState = createFeatureSelector<fromStaticData.State>(
  fromStaticData.staticDataFeatureKey
);

export const selectItemTypes = createSelector(
  selectStaticDataState,
  (state: StaticData): ItemTypes => state.itemTypes
)
