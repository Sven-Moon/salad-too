
import { Location } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NavComponent } from '../nav/nav.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SharedModule } from '../shared.module';
import { of } from 'rxjs';
import { selectNavPointer } from '../state/shared.selectors';
import { selectIsSignedIn, selectUser } from 'src/app/store/auth/auth.selectors';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { AppModule } from 'src/app/app.module';
import { OrderService } from 'src/app/services/order.service';
import { selectCartCount } from '../../order/state/cart/cart.selectors';
import { selectOpenOrdersStatus } from '../../orders/state/orders.selectors';
import { Router } from '@angular/router';
import { routes } from 'src/app/app.routing';
import { createComponent } from '@angular/compiler/src/core';
import { AppComponent } from 'src/app/app-root/app.component';
import { SpyLocation } from '@angular/common/testing'
import { Type } from '@angular/core';

let comp: NavComponent
let fixture: ComponentFixture<NavComponent>
let location: SpyLocation

describe('NavComponent', () => {
  let authService: AuthService
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // declarations: [NavComponent],
      providers: [
        NavComponent,
        provideMockStore(),
        { provide: AuthService, useClass: MockAuthService },
        { provide: BsModalService, useClass: MockBSModalService }
      ],
      imports: [
        AppModule,
        RouterTestingModule.withRoutes(routes)
      ]
    }).compileComponents()
    comp = TestBed.inject(NavComponent);
    authService = TestBed.inject(AuthService)
    storeSetup(store)
  }))

  it('should exist', () => {
    expect(comp).toBeTruthy();
  })

  // it('should navigate to launch immediately', fakeAsync(() => {
  //   createComponent()
  //   tick() // wait for async data to arrive
  //   expectPathToBe('order/launch', 'after initialNavigation()')
  //   expectElementOf(NavComponent)
  // }))

});


function storeSetup(store) {
  let mockNavPointer;
  let mockIsSignedIn;
  let mockUser;
  let mockCartCount;
  let mockOpenOrdersStatus;
  let user = {
    id: 'testId',
    name: 'testName',
    phoneNumber: 'testPhone',
    email: 'testEmail',
    contacts: [],
    img: 'testImg'
  }

  store = TestBed.inject(MockStore)
  mockNavPointer = store.overrideSelector(selectNavPointer, 'order')
  mockIsSignedIn = store.overrideSelector(selectIsSignedIn, false)
  mockUser = store.overrideSelector(selectUser, user)
  mockCartCount = store.overrideSelector(selectCartCount, 3)
  mockOpenOrdersStatus = store.overrideSelector(selectOpenOrdersStatus, 'status-none')
}

class MockAuthService {

}

class MockBSModalService {

}

function expectPathToBe(path: string, expectationFailOutput?: any) {
  expect(location.path()).toEqual(path, expectationFailOutput || 'location.path()')
}

function expectElementOf(type: Type<any>): any {
  const el = fixture.debugElement.query(By.directive(type))
  expect(el).toBeTruthy('expected an element for ' + type.name)
  return el
}
