import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders.routing';
import { OrdersComponent } from './orders/orders.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { OrdersStatusComponent } from './orders-status/orders-status.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrdersHistoryComponent,
    OrdersStatusComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
