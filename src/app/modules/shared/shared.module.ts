import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromShared from './state/shared.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './state/shared.effects';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromShared.sharedFeatureKey, fromShared.reducer),
    EffectsModule.forFeature([SharedEffects])
  ]
})
export class SharedModule { }
