import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Error } from '../models/Error';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = 'https://localhost:3000/users/'
  body = {}

  public login(email: string, password: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + '?email=' + email).pipe(
      catchError(this.handleLoginError)
    )
  }

  private handleLoginError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Client side or network error occurred.
      console.error('An error occurred: ', error.error)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what's wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      )
    }
    // Return an observable with a user facing error message
    return throwError(
      'Bad things: Try another user/password combo'
    )
  }

  public registerUser(email: string, password: string, username: string, confirmPassword: string): Observable<any> {
    let registration = {
      email: email,
      password: password,
      username: username,
      confirmPassword: confirmPassword
    }
    return this.httpClient.post(this.baseUrl, registration).pipe(
      catchError(this.handleRegisterError)
    )
  }

  private handleRegisterError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Client side or network error occurred.
      console.error('An error occurred: ', error.error)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what's wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      )
    }
    // Return an observable with a user facing error message
    return throwError(
      'Bad things: User could not be registered'
    )
  }

}