import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayRoutingModule } from './pay.routing';
import { StoreModule } from '@ngrx/store';
import * as fromPay from './state/pay.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PayEffects } from './state/pay.effects';
import { PayComponent } from './pay/pay.component';
import { PayInfoComponent } from './pay-info/pay-info.component';
import { PaySuccessComponent } from './pay-success/pay-success.component';
import { PayFailComponent } from './pay-fail/pay-fail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PayEmailReceiptComponent } from './pay-email-receipt/pay-email-receipt.component';


@NgModule({
  declarations: [
    PayComponent,
    PayInfoComponent,
    PayFailComponent,
    PaySuccessComponent,
    PayEmailReceiptComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PayRoutingModule,
    RouterModule,
    StoreModule.forFeature(fromPay.payFeatureKey, fromPay.reducer),
    EffectsModule.forFeature([PayEffects])
  ]
})
export class PayModule { }
