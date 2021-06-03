import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCustomizeItemComponent } from '../order-customize-item/order-customize-item.component';

describe('OrderCustomizeItemComponent', () => {
  let component: OrderCustomizeItemComponent;
  let fixture: ComponentFixture<OrderCustomizeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderCustomizeItemComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCustomizeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
