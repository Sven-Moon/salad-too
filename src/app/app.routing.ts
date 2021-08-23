import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './modules/order/order/order.component';
import { OrdersComponent } from './modules/orders/orders/orders.component';
import { AccountComponent } from './modules/auth/account/account.component';
import { PayComponent } from './modules/pay/pay/pay.component';

export const routes: Routes = [
  {
    path: 'order/', component: OrderComponent,
    loadChildren: () => import('./modules/order/order.module')
      .then((m) => m.OrderModule)
  },
  {
    path: 'pay/', component: PayComponent,
    loadChildren: () => import('./modules/pay/pay.module')
      .then((m) => m.PayModule)
  },
  { path: 'orders', component: OrdersComponent },
  { path: 'account', component: AccountComponent },
  { path: '', redirectTo: 'order', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
