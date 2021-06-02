import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemSelectComponent } from './cart-item-select.component';

describe('CartItemSelectComponent', () => {
  let component: CartItemSelectComponent;
  let fixture: ComponentFixture<CartItemSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
