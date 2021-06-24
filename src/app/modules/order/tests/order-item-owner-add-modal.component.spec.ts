import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemOwnerAddModalComponent } from '../order-item-owner-add-modal/order-item-owner-add-modal.component';

describe('OrderItemOwnerAddModalComponent', () => {
  let component: OrderItemOwnerAddModalComponent;
  let fixture: ComponentFixture<OrderItemOwnerAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderItemOwnerAddModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemOwnerAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
