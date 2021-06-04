import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './modules/order/order/order.component';

const routes: Routes = [
  {
    path: 'order', component: OrderComponent,
    loadChildren: () => import('./modules/order/order.module')
      .then((m) => m.OrderModule)
  },
  // { path: 'pay', component: },
  // { path: '', redirectTo: 'order', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
