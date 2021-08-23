import { SpyLocation } from '@angular/common/testing';
import { DebugElement, Type } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppModule } from '../app.module';
import { OrderLaunchComponent } from '../modules/order/order-launch/order-launch.component';
import { DefaultUserService } from '../services/default-user.service';
import { selectUser } from '../store/auth/auth.selectors';
import { AppComponent } from './app.component';
import { Location } from '@angular/common';
import { asyncData } from '../testing/async-observable-helpers';

let comp: AppComponent
let fixture: ComponentFixture<AppComponent>
let router: Router
let location: SpyLocation
let store: MockStore
let page: Page;

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule
      ],
      providers: [
        provideMockStore(),
        { provide: DefaultUserService, useClass: MockDefaultUserService }
      ],
    }).compileComponents();
  }));

  it('should navigate to "/order/launch" immediately', fakeAsync(() => {
    createComponent()
    tick()
    expectPathToBe('order/launch', 'after initial Navigation()')
    expectElementOf(OrderLaunchComponent)
  }))

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'salad-too'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('salad-too');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('salad-too app is running!');
  // });
});

function storeSetup(store) {
  let MockStore
  let mockUser;
  let user = {
    id: 'testId',
    name: 'testName',
    phoneNumber: 'testPhone',
    email: 'testEmail',
    contacts: [],
    img: 'testImg'
  }

  store = TestBed.inject(MockStore)
  mockUser = store.overrideSelector(selectUser, user)
}

export class MockDefaultUserService {
  public generateId() {
    return '12345678'
  }
}

function expectPathToBe(path: string, expectationFailOutput?: any) {
  expect(location.path()).toEqual(path, expectationFailOutput || 'location.path()');
}

function expectElementOf(type: Type<any>): any {
  const el = fixture.debugElement.query(By.directive(type));
  expect(el).toBeTruthy('expected an element for ' + type.name);
  return el;
}

// HELPERS
function createComponent() {
  fixture = TestBed.createComponent(AppComponent);
  comp = fixture.componentInstance;

  const injector = fixture.debugElement.injector;
  location = injector.get(Location) as SpyLocation;
  // router = injector.get(Router);
  // router.initialNavigation();
  // spyOn(injector.get(TwainService), 'getQuote')
  //   // fake fast async observable
  //   .and.returnValue(asyncData('Test Quote'));
  // advance();

  page = new Page();
}


class Page {
  aboutLinkDe: DebugElement;
  dashboardLinkDe: DebugElement;
  heroesLinkDe: DebugElement;

  // for debugging
  comp: AppComponent;
  router: Router;
  fixture: ComponentFixture<AppComponent>;

  constructor() {
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    this.aboutLinkDe = links[2];
    this.dashboardLinkDe = links[0];
    this.heroesLinkDe = links[1];

    // for debugging
    this.comp = comp;
    this.fixture = fixture;
    this.router = router;
  }
}

/**
 * Advance to the routed page
 * Wait a tick, then detect changes, and tick again
 */
function advance(): void {
  tick();                   // wait while navigating
  fixture.detectChanges();  // update view
  tick();                   // wait for async data to arrive
}
