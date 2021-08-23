import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypeSelectComponent } from '../order-type-select/order-type-select.component';

describe('OrderTypeSelectComponent', () => {
  let component: OrderTypeSelectComponent;
  let fixture: ComponentFixture<OrderTypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderTypeSelectComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
