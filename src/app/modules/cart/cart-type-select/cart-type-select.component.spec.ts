import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTypeSelectComponent } from './cart-type-select.component';

describe('CartTypeSelectComponent', () => {
  let component: CartTypeSelectComponent;
  let fixture: ComponentFixture<CartTypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartTypeSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
