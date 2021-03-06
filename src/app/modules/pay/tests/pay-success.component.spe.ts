import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaySuccessComponent } from '../pay-success/pay-success.component';

describe('PaySuccessComponent', () => {
  let component: PaySuccessComponent;
  let fixture: ComponentFixture<PaySuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaySuccessComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
