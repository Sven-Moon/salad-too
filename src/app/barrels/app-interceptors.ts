import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { HttpErrorServiceInterceptor } from "../Interceptors/http-error-interceptor.service"

export const AppInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorServiceInterceptor, multi: true },
]
