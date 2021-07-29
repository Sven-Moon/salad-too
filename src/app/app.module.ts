import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from 'src/app/app-root/app.component'
import { HeaderComponent } from './modules/shared/header/header.component';
import { NavComponent } from './modules/shared/nav/nav.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers, metaReducers } from './store';
import { AppMockInterceptors } from './barrels/app-mocks';
import { SharedModule } from './modules/shared/shared.module';
import { OrderModule } from './modules/order/order.module';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal'
import { AuthModule } from './modules/auth/auth.module';
import { FormsModule } from '@angular/forms';
import * as fromContacts from './store/contacts/contacts.reducer';
import { SpinnerEffects } from './store/effects/spinner.effects';
import { AlertEffects } from './store/effects/alert.effects';
import { AlertModule } from '@full-fledged/alerts';
import { RouteEffects } from './store/effects/route.effects';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PayModule } from './modules/pay/pay.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OwnerModule } from './modules/owner/owner.module'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    //#region ============= Core Function
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    //#endregion core function
    //#region ============= App Modules
    AuthModule,
    OrderModule,
    OrdersModule,
    OwnerModule,
    PayModule,
    SharedModule,
    //#endregion app modules
    //#region ============= Third Party
    AlertModule.forRoot(
      { maxMessages: 5, timeout: 5000, positionX: 'right', positionY: 'top' }
    ),
    NgxSpinnerModule,
    ModalModule.forRoot(),
    // #endregion 3rd party
    //#region ============= Store
    StoreModule.forRoot({}, {}),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    // StoreModule.forFeature(fromContacts.contactsFeatureKey, fromContacts.reducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    //#endregion store
    EffectsModule.forRoot([SpinnerEffects, AlertEffects, RouteEffects]),
  ],
  providers: [
    ...(environment.useMocking ? AppMockInterceptors : [])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
