import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemTaggerComponent } from '../order-item-tagger/order-item-tagger.component';

describe('OrderItemTaggerComponent', () => {
  let component: OrderItemTaggerComponent;
  let fixture: ComponentFixture<OrderItemTaggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderItemTaggerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemTaggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
