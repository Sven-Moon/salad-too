import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemTaggerPickComponent } from '../order-item-tagger-pick/order-item-tagger-pick.component';

describe('OrderItemTaggerPickComponent', () => {
  let component: OrderItemTaggerPickComponent;
  let fixture: ComponentFixture<OrderItemTaggerPickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderItemTaggerPickComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemTaggerPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
