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
import { SharedModule } from './modules/shared/shared.module';
import { OrderModule } from './modules/order/order.module';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal'
import { AuthModule } from './modules/auth/auth.module';
import { FormsModule } from '@angular/forms';
import { SpinnerEffects } from './store/effects/spinner.effects';
import { AlertEffects } from './store/effects/alert.effects';
import { AlertModule } from '@full-fledged/alerts';
import { RouteEffects } from './store/effects/route.effects';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PayModule } from './modules/pay/pay.module';
import { OrdersModule } from './modules/orders/orders.module';
import { NgxMaskModule } from 'ngx-mask';
import { AppInterceptors, AppMockInterceptors } from './barrels/app-interceptors';

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
    PayModule,
    SharedModule,
    //#endregion app modules
    //#region ============= Third Party
    AlertModule.forRoot(
      { maxMessages: 5, timeout: 10000, positionX: 'left', positionY: 'bottom' }
    ),
    NgxMaskModule.forRoot(),
    NgxSpinnerModule,
    ModalModule.forRoot(),
    // #endregion 3rd party
    //#region ============= Store
    StoreModule.forRoot({}, {}),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    //#endregion store
    EffectsModule.forRoot([SpinnerEffects, AlertEffects, RouteEffects]),
  ],
  providers: [
    ...(environment.useMocking ? AppMockInterceptors : []),
    AppInterceptors
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
