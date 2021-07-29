import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders.routing';
import { OrdersComponent } from './orders/orders.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { OrdersStatusComponent } from './orders-status/orders-status.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromOrders from './state/orders.reducer';
import { OrdersEffects } from './state/orders.effects';


@NgModule({
  declarations: [
    OrdersComponent,
    OrdersHistoryComponent,
    OrdersStatusComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    StoreModule.forFeature(fromOrders.ordersFeatureKey, fromOrders.reducer),
    EffectsModule.forFeature([OrdersEffects])
  ]
})
export class OrdersModule { }
