
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaySelectComponent } from '../pay-select/pay-select.component';

describe('PaySelectComponent', () => {
  let component: PaySelectComponent;
  let fixture: ComponentFixture<PaySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaySelectComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
