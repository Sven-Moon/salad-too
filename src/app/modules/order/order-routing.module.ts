import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { OrderCustomizeItemComponent } from './order-customize-item/order-customize-item.component';
import { OrderItemSelectComponent } from './order-item-select/order-item-select.component';
import { OrderLaunchComponent } from './order-launch/order-launch.component';
import { OrderTypeSelectComponent } from './order-type-select/order-type-select.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: 'order', component: OrderComponent,
    children: [
      { path: 'launch', component: OrderLaunchComponent },
      { path: 'customize', component: OrderCustomizeItemComponent },
      { path: 'select-item', component: OrderItemSelectComponent },
      { path: 'select-item-type', component: OrderTypeSelectComponent },
      { path: 'cart', component: OrderCartComponent },
      { path: '', redirectTo: 'launch', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
