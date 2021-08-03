import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer, StoreModule
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import * as fromOrder from '../modules/order/state/order/order.reducer';
import * as fromItem from '../modules/order/state/item/item.reducer';
import * as fromCart from '../modules/order/state/cart/cart.reducer';
import * as fromStaticData from '../modules/order/state/staticData/static-data.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromPay from '../modules/pay/state/pay.reducer';


export interface State {

  [fromOrder.orderFeatureKey]: fromOrder.State;
  [fromItem.itemFeatureKey]: fromItem.State;
  [fromCart.cartFeatureKey]: fromCart.State;
  [fromStaticData.staticDataFeatureKey]: fromStaticData.State;
  [fromAuth.authFeatureKey]: fromAuth.State;
  [fromPay.payFeatureKey]: fromPay.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromOrder.orderFeatureKey]: fromOrder.reducer,
  [fromItem.itemFeatureKey]: fromItem.reducer,
  [fromCart.cartFeatureKey]: fromCart.reducer,
  [fromStaticData.staticDataFeatureKey]: fromStaticData.reducer,
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromPay.payFeatureKey]: fromPay.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
