import { Action, createReducer, on } from '@ngrx/store';
import { Alert } from 'src/app/models/Alert';
import * as SharedActions from './shared.actions';

export const sharedFeatureKey = 'shared';

export interface State {
  navPointer: string
  alert: Alert
}

export const initialState: State = {
  navPointer: '0%',
  alert: {
    type: null,
    msg: null,
    timeout: null
  }
};


export const reducer = createReducer(
  initialState,

  on(SharedActions.updateNavPointer, (state, action) => ({
    ...state, navPointer: action.pointer
  })),
  on(SharedActions.displayAlert, (state, action) => ({
    ...state,
    alert: {
      type: action.alertType,
      msg: action.msg,
      timeout: action.timeout
    }
  })),

  // boiler plate
  on(SharedActions.loadShareds, state => state),
  on(SharedActions.loadSharedsSuccess, (state, action) => state),
  on(SharedActions.loadSharedsFailure, (state, action) => state),

);

