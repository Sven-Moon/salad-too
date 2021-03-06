import { TestBed } from '@angular/core/testing';

import { PaymentMockInterceptor } from '../paymentMock.interceptor';

describe('PaymentMockInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PaymentMockInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PaymentMockInterceptor = TestBed.inject(PaymentMockInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
