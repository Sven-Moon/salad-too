import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = 'http://localhost:3000/users/'
  body = {}

  public login(email: string, password: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + '?email=' + email)
      .pipe(
        switchMap((users) => {
          let user = users[0]
          if (user) {
            return of(user)
          } else return throwError('Unable to log in')
        })
        // catchError(this.handleLoginError)
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

  public registerUser(email: string, username: string): Observable<any> {
    let body = {
      id: email.toLowerCase(),
      email: email.toLowerCase(),
      phoneNumber: '',
      name: username,
      contacts: [],
      img: './assets/images/profile_1.png'
    }
    return this.httpClient.post(this.baseUrl, body).pipe(
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

  public updateUserName(data: { id: string, password: string, newUsername: string }): Observable<any> {
    this.body = { name: data.newUsername }
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      })
    }

    return this.httpClient.patch(
      this.baseUrl + "/" + data.id, this.body
    ).pipe(
      switchMap((userReply) => {
        let user = userReply
        console.log(user)
        if (user) {
          return of(user)
        } else return throwError('Can\'t find user')
      })
    )
  }

}