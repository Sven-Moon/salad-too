import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth.routing';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from '../../store/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../store/auth/auth.effects';
import { FormsModule } from '@angular/forms';
import { passwordsMatchDirective } from './resources/passwordMatch.directive';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AccountComponent } from './account/account.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    AccountComponent,
    LoginModalComponent,
    passwordsMatchDirective
  ],
  imports: [
    AlertModule.forRoot(),
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    NgxMaskModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule { }
