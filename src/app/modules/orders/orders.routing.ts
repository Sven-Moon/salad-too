import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from '../order/order/order.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { OrdersStatusComponent } from './orders-status/orders-status.component';

const routes: Routes = [
  {
    path: 'orders', component: OrderComponent,
    children: [
      { path: 'status', component: OrdersStatusComponent },
      { path: 'history', component: OrdersHistoryComponent },
      { path: '', redirectTo: 'history', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
