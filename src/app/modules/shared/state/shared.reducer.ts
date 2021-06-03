import { Action, createReducer, on } from '@ngrx/store';
import * as SharedActions from './shared.actions';

export const sharedFeatureKey = 'shared';

export interface State {
  navPointer: string

}

export const initialState: State = {
  navPointer: '0%'
};


export const reducer = createReducer(
  initialState,

  on(SharedActions.updateNavPointer, (state, action) => ({
    ...state, navPointer: action.pointer
  })),

  // boiler plate
  on(SharedActions.loadShareds, state => state),
  on(SharedActions.loadSharedsSuccess, (state, action) => state),
  on(SharedActions.loadSharedsFailure, (state, action) => state),

);

