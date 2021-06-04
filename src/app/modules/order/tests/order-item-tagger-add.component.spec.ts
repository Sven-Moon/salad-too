import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemTaggerAddComponent } from '../order-item-tagger-add/order-item-tagger-add.component';

describe('OrderItemTaggerAddComponent', () => {
  let component: OrderItemTaggerAddComponent;
  let fixture: ComponentFixture<OrderItemTaggerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderItemTaggerAddComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemTaggerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
