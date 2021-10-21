import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contacts } from '../models/User';
import { selectUser } from '../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIService {
  body = {}

  constructor(
    private httpClient: HttpClient,
    private store: Store
  ) {
    this.store.select(selectUser).subscribe(user =>
      this.body = user
    )
  }


  public login(email: string, password: string): Observable<any> {
    let userEmail = email.toLowerCase();
    let url: string = environment.baseUrl + '/account/login'
    this.body = {
      email: userEmail,
      password: password
    }
    return this.httpClient.post(url, this.body)
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

    return this.updateServer(url, data)
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

    return this.updateServer(url, data)
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

    return this.updateServer(url, data)
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

    return this.updateServer(url, data)
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

    return this.updateServer(url, data)
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

    return this.updateServer(url, data)

    // return this.httpClient.put(
    //   url + "/" + data.id, this.body
    // ).pipe(
    //   switchMap((userReply) => {
    //     let user = userReply
    //     if (user) {
    //       return of(user)
    //     } else return throwError('Can\'t find user')
    //   })
    // )
  }

  private updateServer(url, data) {
    return this.httpClient.put(
      url + "/" + data.id, this.body
    ).pipe(
      switchMap((userReply) => {
        let user = userReply
        if (user) {
          return of(user)
        } else return throwError("Can't find user")
      })
    )
  }

  // private handleEditError(error: HttpErrorResponse) {
  //   if (error.status === 0) {
  //     // Client side or network error occurred.
  //     console.error("The server couldn't be reached")
  //     console.error('Error: ', error.error)
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what's wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, ` + `body was: ${error.error}`
  //     )
  //   }
  //   // Return an observable with a user facing error message
  //   return throwError(
  //     'Bad things: User could not be found'
  //   )
  // }
}
