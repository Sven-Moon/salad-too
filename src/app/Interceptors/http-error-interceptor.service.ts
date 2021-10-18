import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '@full-fledged/alerts';

@Injectable({ providedIn: 'root' })
export class HttpErrorServiceInterceptor implements HttpInterceptor {
  constructor(
    private alertService: AlertService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // get error even if api &/or database down
        const errorMessage = this.setError(error)
        console.log(error)
        this.alertService.danger('Message: ' + errorMessage +
        '   Status: ' + error.status)
        return throwError(errorMessage)
      })
    );
  }

  /**
   * Returns 'Server couldn't be reached' if
   * server doesn't respond (code 0)
   * else responds with full error
   */
  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Server couldn\'t be reached';
    // client-side error: instanceof ErrorEvent
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }
    // server side error
    else {
      if (error.status !== 0){
        errorMessage = error.error.errorMessage
      }
    }
    return errorMessage
   }
}
