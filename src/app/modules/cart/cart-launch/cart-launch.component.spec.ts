import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartLaunchComponent } from './cart-launch.component';

describe('CartLaunchComponent', () => {
  let component: CartLaunchComponent;
  let fixture: ComponentFixture<CartLaunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartLaunchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
