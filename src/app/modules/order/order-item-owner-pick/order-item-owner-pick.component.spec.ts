import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemOwnerPickComponent } from './order-item-owner-pick.component';

describe('OrderItemOwnerPickComponent', () => {
  let component: OrderItemOwnerPickComponent;
  let fixture: ComponentFixture<OrderItemOwnerPickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemOwnerPickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemOwnerPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
