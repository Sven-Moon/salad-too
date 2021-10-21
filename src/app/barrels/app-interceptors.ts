import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { HttpErrorServiceInterceptor } from "../Interceptors/http-error-interceptor.service"
import { StaticDataMockInterceptor } from "../Interceptors/mocks/orderStaticData.interceptor"
import { PaymentMockInterceptor } from "../Interceptors/mocks/payment-mock.interceptor"
import { UsersMockInterceptor } from "../Interceptors/mocks/users-mock-interceptor"
import { AccountMockInterceptor } from "../Interceptors/mocks/account.interceptor"

export const AppInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorServiceInterceptor, multi: true },
]

export const AppMockInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: StaticDataMockInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: PaymentMockInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UsersMockInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AccountMockInterceptor, multi: true }
]
