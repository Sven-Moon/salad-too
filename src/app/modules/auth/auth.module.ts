import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth.routing';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from '../../store/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../store/auth/auth.effects';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginModalComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule { }