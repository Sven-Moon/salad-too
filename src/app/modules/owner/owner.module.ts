import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner.routing';
import { OwnerComponent } from './owner/owner.component'
import { OwnerPickComponent } from './owner-pick/owner-pick.component';
import { OwnerAddComponent } from './owner-add/owner-add.component';
import { StoreModule } from '@ngrx/store';
import * as fromOwner from './state/owner.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OwnerEffects } from './state/owner.effects';


@NgModule({
  declarations: [
    OwnerComponent,
    OwnerPickComponent,
    OwnerAddComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    StoreModule.forFeature(fromOwner.ownerFeatureKey, fromOwner.reducer),
    EffectsModule.forFeature([OwnerEffects])
  ]
})
export class OwnerModule { }
