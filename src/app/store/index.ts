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
import * as fromOrder from '../modules/order/state/order/order.reducer';
import * as fromItem from '../modules/order/state/item/item.reducer';
import * as fromCart from '../modules/order/state/cart/cart.reducer';
import * as fromStaticData from '../modules/order/state/staticData/static-data.reducer';
import * as fromAuth from './auth/auth.reducer';


export interface State {

  [fromOrder.orderFeatureKey]: fromOrder.State;
  [fromItem.itemFeatureKey]: fromItem.State;
  [fromCart.cartFeatureKey]: fromCart.State;
  [fromUser.userFeatureKey]: fromUser.State;
  [fromStaticData.staticDataFeatureKey]: fromStaticData.State;
  [fromAuth.authFeatureKey]: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromOrder.orderFeatureKey]: fromOrder.reducer,
  [fromItem.itemFeatureKey]: fromItem.reducer,
  [fromCart.cartFeatureKey]: fromCart.reducer,
  [fromUser.userFeatureKey]: fromUser.reducer,
  [fromStaticData.staticDataFeatureKey]: fromStaticData.reducer,
  [fromAuth.authFeatureKey]: fromAuth.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
