import { NgModule } from '@angular/core';
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
import { ContactsEffects } from './store/contacts/contacts.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    OrderModule,
    ModalModule.forRoot(),
    SharedModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(fromContacts.contactsFeatureKey, fromContacts.reducer),
    EffectsModule.forFeature([ContactsEffects]),
  ],
  providers: [
    ...(environment.useMocking ? AppMockInterceptors : [])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
