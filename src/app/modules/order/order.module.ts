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
import { OrderItemTaggerComponent } from './order-item-tagger/order-item-tagger.component';
import { OrderItemTaggerPickComponent } from './order-item-tagger-pick/order-item-tagger-pick.component';
import { OrderItemTaggerAddComponent } from './order-item-tagger-add/order-item-tagger-add.component';
import { StoreModule } from '@ngrx/store';
import * as fromState from './state/state.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StateEffects } from './state/state.effects';


@NgModule({
  declarations: [
    OrderComponent,
    OrderCustomizeItemComponent,
    OrderItemSelectComponent,
    OrderLaunchComponent,
    OrderTypeSelectComponent,
    OrderCartComponent,
    OrderItemTaggerComponent,
    OrderItemTaggerPickComponent,
    OrderItemTaggerAddComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    RouterModule,
    StoreModule.forFeature(fromState.stateFeatureKey, fromState.reducer),
    EffectsModule.forFeature([StateEffects])
  ]
})
export class OrderModule { }
