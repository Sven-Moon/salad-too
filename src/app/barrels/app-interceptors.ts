import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { HttpErrorServiceInterceptor } from "../Interceptors/http-error-interceptor.service"
import { StaticDataMockInterceptor } from "../Interceptors/mocks/orderStaticDataMock.interceptor"
import { PaymentMockInterceptor } from "../Interceptors/mocks/paymentMock.interceptor"
import { UsersMockInterceptor } from "../Interceptors/mocks/usersMock.interceptor"
import { AccountMockInterceptor } from "../Interceptors/mocks/accountMock.interceptor"
import { ContactsMockInterceptor } from "../Interceptors/mocks/contactsMock.interceptor"

export const AppInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorServiceInterceptor, multi: true },
]

export const AppMockInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: StaticDataMockInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: PaymentMockInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UsersMockInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AccountMockInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ContactsMockInterceptor, multi: true }
]
