import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemOwnerComponent } from '../order-item-owner/order-item-owner.component';

describe('OrderItemOwnerComponent', () => {
  let component: OrderItemOwnerComponent;
  let fixture: ComponentFixture<OrderItemOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderItemOwnerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
