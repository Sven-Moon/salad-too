import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { MockStaticDataInterceptor } from "../mocks/orderStaticData.interceptor"

export const AppMockInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: MockStaticDataInterceptor, multi: true }
]
