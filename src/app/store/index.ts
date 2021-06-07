import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer, StoreModule
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUser from './user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user/user.effects';
import * as fromState from '../modules/order/state/state.reducer';


export interface State {

  [fromState.stateFeatureKey]: fromState.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromState.stateFeatureKey]: fromState.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
