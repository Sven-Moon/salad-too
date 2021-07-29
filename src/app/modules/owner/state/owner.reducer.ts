import { Action, createReducer, on } from '@ngrx/store';
import * as OwnerActions from './owner.actions';

export const ownerFeatureKey = 'owner';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(OwnerActions.loadOwners, state => state),

);

