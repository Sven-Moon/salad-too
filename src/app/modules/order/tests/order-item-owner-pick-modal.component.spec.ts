import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemOwnerPickModalComponent } from '../order-item-owner-pick-modal/order-item-owner-pick-modal.component';

describe('OrderItemOwnerPickModalComponent', () => {
  let component: OrderItemOwnerPickModalComponent;
  let fixture: ComponentFixture<OrderItemOwnerPickModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderItemOwnerPickModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemOwnerPickModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
