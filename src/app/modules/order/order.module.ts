import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order.routing';
import { OrderComponent } from './order/order.component';
import { OrderCustomizeItemComponent } from './order-customize-item/order-customize-item.component';
import { OrderItemSelectComponent } from './order-item-select/order-item-select.component';
import { OrderLaunchComponent } from './order-launch/order-launch.component';
import { OrderTypeSelectComponent } from './order-type-select/order-type-select.component';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromOrder from './state/order/order.reducer';
import { OrderEffects } from './state/order/order.effects';
import * as fromItem from './state/item/item.reducer';
import { ItemEffects } from './state/item/item.effects';
import * as fromCart from './state/cart/cart.reducer';
import { CartEffects } from './state/cart/cart.effects';
import { OrderItemOwnerComponent } from './order-item-owner/order-item-owner.component';
import { OrderItemOwnerAddComponent } from './order-item-owner-add/order-item-owner-add.component';
import { OrderItemOwnerPickComponent } from './order-item-owner-pick/order-item-owner-pick.component';
import * as fromStaticData from './state/staticData/static-data.reducer';
import { StaticDataEffects } from './state/staticData/static-data.effects';


@NgModule({
  declarations: [
    OrderComponent,
    OrderCustomizeItemComponent,
    OrderItemSelectComponent,
    OrderLaunchComponent,
    OrderTypeSelectComponent,
    OrderCartComponent,
    OrderItemOwnerComponent,
    OrderItemOwnerAddComponent,
    OrderItemOwnerPickComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    RouterModule,
    //#region Store
    StoreModule.forFeature(fromOrder.orderFeatureKey, fromOrder.reducer),
    StoreModule.forFeature(fromItem.itemFeatureKey, fromItem.reducer),
    EffectsModule.forFeature([ItemEffects, CartEffects, StaticDataEffects]),
    StoreModule.forFeature(fromCart.cartFeatureKey, fromCart.reducer),
    StoreModule.forFeature(fromStaticData.staticDataFeatureKey, fromStaticData.reducer)
    //#endregion store
  ]
})
export class OrderModule { }
