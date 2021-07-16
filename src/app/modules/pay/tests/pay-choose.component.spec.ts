import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayChooseComponent } from '../pay-choose/pay-choose.component';

describe('PayChooseComponent', () => {
  let component: PayChooseComponent;
  let fixture: ComponentFixture<PayChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayChooseComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
