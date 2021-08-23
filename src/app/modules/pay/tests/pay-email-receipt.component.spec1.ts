import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayEmailReceiptComponent } from '../pay-email-receipt/pay-email-receipt.component';

describe('PayEmailReceiptComponent', () => {
  let component: PayEmailReceiptComponent;
  let fixture: ComponentFixture<PayEmailReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayEmailReceiptComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayEmailReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
