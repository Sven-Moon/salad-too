import { createAction, props } from '@ngrx/store';
import { StaticData } from 'src/app/models/StaticData';

export const loadStaticData = createAction(
  '[StaticData] Load StaticData'
);

export const loadStaticDataSuccess = createAction(
  '[StaticData] Load StaticData Success',
  props<{ data: StaticData }>()
);

export const loadStaticDataFailure = createAction(
  '[StaticData] Load StaticData Failure',
  props<{ error: any }>()
);

