import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order/order.component';
import { OrderCustomizeItemComponent } from './order-customize-item/order-customize-item.component';
import { OrderItemSelectComponent } from './order-item-select/order-item-select.component';
import { OrderLaunchComponent } from './order-launch/order-launch.component';
import { OrderTypeSelectComponent } from './order-type-select/order-type-select.component';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    OrderComponent,
    OrderCustomizeItemComponent,
    OrderItemSelectComponent,
    OrderLaunchComponent,
    OrderTypeSelectComponent,
    OrderCartComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    RouterModule
  ]
})
export class OrderModule { }
