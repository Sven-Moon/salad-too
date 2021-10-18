import { TestBed } from '@angular/core/testing';

import { HttpErrorServiceInterceptor } from './http-error-interceptor.service';

xdescribe('HttpErrorInterceptorServiceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpErrorServiceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpErrorServiceInterceptor = TestBed.inject(HttpErrorServiceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
