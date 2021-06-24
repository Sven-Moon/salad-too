import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { MockStaticDataInterceptor } from "../mocks/orderStaticData.interceptor"
import { MockUserDataInterceptor } from "../mocks/userData.interceptor"

export const AppMockInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: MockStaticDataInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: MockUserDataInterceptor, multi: true }
]
