import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCustomizeItemComponent } from './cart-customize-item.component';

describe('CartCustomizeItemComponent', () => {
  let component: CartCustomizeItemComponent;
  let fixture: ComponentFixture<CartCustomizeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartCustomizeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCustomizeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
