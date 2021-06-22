import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemOwnerAddComponent } from '../order-item-owner-add/order-item-owner-add.component';

describe('OrderItemOwnerAddComponent', () => {
  let component: OrderItemOwnerAddComponent;
  let fixture: ComponentFixture<OrderItemOwnerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderItemOwnerAddComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemOwnerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
