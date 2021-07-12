import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayFailComponent } from './pay-fail/pay-fail.component';
import { PayInfoComponent } from './pay-info/pay-info.component';
import { PaySuccessComponent } from './pay-success/pay-success.component';
import { PayComponent } from './pay/pay.component';

const routes: Routes = [
  {
    path: 'pay', component: PayComponent,
    children: [
      { path: 'info', component: PayInfoComponent },
      { path: 'success', component: PaySuccessComponent },
      { path: 'fail', component: PayFailComponent },
      { path: '', redirectTo: 'pay', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayRoutingModule { }
