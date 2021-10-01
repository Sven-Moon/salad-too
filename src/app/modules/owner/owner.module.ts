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
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from 'src/app/pipes/truncate';


@NgModule({
  declarations: [
    OwnerComponent,
    OwnerPickComponent,
    OwnerAddComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    OwnerRoutingModule,
    StoreModule.forFeature(fromOwner.ownerFeatureKey, fromOwner.reducer),
    EffectsModule.forFeature([OwnerEffects])
  ]
})
export class OwnerModule { }
