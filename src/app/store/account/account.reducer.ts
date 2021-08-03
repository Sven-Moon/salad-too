import { Action, createReducer, on } from '@ngrx/store';
import * as AccountActions from './account.actions';

export const accountFeatureKey = 'account';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(AccountActions.loadAccounts, state => state),
  on(AccountActions.loadAccountsSuccess, (state, action) => state),
  on(AccountActions.loadAccountsFailure, (state, action) => state),

);

