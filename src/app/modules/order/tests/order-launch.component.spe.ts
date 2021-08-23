import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLaunchComponent } from '../order-launch/order-launch.component';

describe('OrderLaunchComponent', () => {
  let component: OrderLaunchComponent;
  let fixture: ComponentFixture<OrderLaunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderLaunchComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
