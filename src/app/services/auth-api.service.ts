import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contacts } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIService {

  constructor(private httpClient: HttpClient) { }

  body = {}

  public login(email: string, password: string): Observable<any> {
    let userEmail = email.toLowerCase();
    let url: string = environment.baseUrl + '/account/login'
    this.body = {
      email: userEmail,
      password: password
    }
    return this.httpClient.post(url, this.body)
      // .pipe(
      //   switchMap((resp) => {
      //     if (resp) {
      //       return of(resp)
      //     } else return throwError('Unable to log in')
      //   })
      // )
  }

  public registerUser(
    email: string, username: string, password: string
  ): Observable<any> {

    let url: string = environment.baseUrl + '/account/register'
    let body = {
      email: email.toLowerCase(),
      name: username,
      password: password
    }
    return this.httpClient.post(url, body)
  }

   private handleError(error: HttpErrorResponse) {
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
    let errorMsg = error.message
    // Return an observable with a user facing error message
    if (errorMsg.includes('duplicate id')) {
      return throwError('Apparently you already live here because we already have that email address on file.'
      )
    } else {
      return throwError(
        'Bad things: User could not be registered'
      )
    }
  }

  private handleEditError(error: HttpErrorResponse) {
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
      'Bad things: User could not be found'
    )
  }

  public updateUsername(data: {
    id: string, password: string, newUsername: string
  }): Observable<any> {
    let url: string = environment.baseUrl + '/users/update'
    this.body = { name: data.newUsername }
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      })
    }

    return this.httpClient.patch(
      url + "/" + data.id, this.body
    ).pipe(
      switchMap((userReply) => {
        let user = userReply
        if (user) {
          return of(user)
        } else return throwError('Can\'t find user')
      })
    )
  }

  public updatePassword(data: {
    id: string, password: string, newPassword: string
  }): Observable<any> {
    let url: string = environment.baseUrl + '/users/update'
    this.body = { password: data.newPassword }
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      })
    }

    return this.httpClient.patch(
      url + "/" + data.id, this.body
    ).pipe(
      switchMap((userReply) => {
        let user = userReply
        if (user) {
          return of(user)
        } else return throwError('Can\'t find user')
      }),
      catchError(this.handleEditError)
    )
  }

  public updateEmail(data: {
    id: string, password: string, newEmail: string
  }): Observable<any> {
    let url: string = environment.baseUrl + '/users/update'
    this.body = { email: data.newEmail }
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      })
    }

    return this.httpClient.patch(
      url + "/" + "data.id", this.body
    ).pipe(
      switchMap((userReply) => {
        let user = userReply
        if (user) {
          return of(user)
        } else return throwError('Can\'t find user')
      })
    )
  }

  public updatePhoneNumber(data: {
    id: string, password: string, newPhoneNumber: string
  }): Observable<any> {
    let url: string = environment.baseUrl + '/users/update'
    this.body = { phoneNumber: data.newPhoneNumber }
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      })
    }

    return this.httpClient.patch(
      url + "/" + data.id, this.body
    ).pipe(
      switchMap((userReply) => {
        let user = userReply
        if (user) {
          return of(user)
        } else return throwError('Can\'t find user')
      })
    )
  }

  public addNewContact(data: {
    id: string, contacts: Contacts
  }): Observable<any> {
    let url: string = environment.baseUrl + '/users/update'
    this.body = {
      id: data.id,
      contacts: data.contacts
    }
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      })
    }

    return this.httpClient.patch(
      url + "/" + data.id, this.body
    ).pipe(
      switchMap((userReply) => {
        let user = userReply
        if (user) {
          return of(user)
        } else return throwError('Can\'t find user')
      })
    )
  }

  public updateContacts(data: {
    id: string, password: string, newUsername: string
  }): Observable<any> {
    let url: string = environment.baseUrl + '/users/update'
    this.body = { name: data.newUsername }
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      })
    }

    return this.httpClient.patch(
      url + "/" + data.id, this.body
    ).pipe(
      switchMap((userReply) => {
        let user = userReply
        if (user) {
          return of(user)
        } else return throwError('Can\'t find user')
      })
    )
  }

}
