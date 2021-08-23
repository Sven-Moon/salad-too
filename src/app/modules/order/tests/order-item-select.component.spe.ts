import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemSelectComponent } from '../order-item-select/order-item-select.component';

describe('OrderItemSelectComponent', () => {
  let component: OrderItemSelectComponent;
  let fixture: ComponentFixture<OrderItemSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderItemSelectComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
