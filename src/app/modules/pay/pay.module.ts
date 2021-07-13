import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayRoutingModule } from './pay.routing';
import { StoreModule } from '@ngrx/store';
import * as fromPay from './state/pay.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PayEffects } from './state/pay.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PayRoutingModule,
    StoreModule.forFeature(fromPay.payFeatureKey, fromPay.reducer),
    EffectsModule.forFeature([PayEffects])
  ]
})
export class PayModule { }
