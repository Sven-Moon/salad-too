import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let store: MockStore;
  let initialState = {
    navPointer: 'order',
    signedIn: false,
    count: 0,
    openOrderStatus: of(''),
  }
  let mockNavPointer;
  let mockIsSignedIn;
  let mockUser;
  let mockCartCount;
  let mockOpenOrdersStatus;



  // beforeEach(() => {
  //   fixture = TestBed.createComponent(NavComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // mockIsSignedIn = store.overrideSelector(selectIsSignedIn, false)

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      providers: [
        provideMockStore(),
        BsModalService,
        AuthService,
        OrderService
      ],
      imports: [
        RouterTestingModule,
        AppModule
      ],
    }).compileComponents
    store = TestBed.inject(MockStore)

    let user = {
      id: 'testId',
      name: 'testName',
      phoneNumber: 'testPhone',
      email: 'testEmail',
      contacts: [],
      img: 'testImg'
    }
    mockNavPointer = store.overrideSelector(selectNavPointer, 'order')
    mockIsSignedIn = store.overrideSelector(selectIsSignedIn, false)
    mockUser = store.overrideSelector(selectUser, user)
    mockCartCount = store.overrideSelector(selectCartCount, 3)
    mockOpenOrdersStatus = store.overrideSelector(selectOpenOrdersStatus, 'status-none')
  })

  it('should create NavComponent', () => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges()
    expect(component).toBeTruthy();
  });

  // it('Should navigate to /order/launch before menu button click',
  //   () => {
  //     // get the current location in the browser
  //     const location = TestBed.get(Location);
  //     expect(location.path()).toBe('/order/launch');
  //   })

  // it('Should navigate to /launch on menu button click',
  //   () => {
  //     // get starting location
  //     const location = TestBed.get(Location);
  //     // get the button to click
  //     const someImg = fixture.debugElement.queryAll(By.css('div'));
  //     const theImg: HTMLImageElement = someImg[0].nativeElement
  //     theImg.click();
  //     fixture.detectChanges();
  //     fixture.whenStable().then(() => {
  //       expect(location.path().toBe('/order/launch'))
  //     })
  //   })
});
