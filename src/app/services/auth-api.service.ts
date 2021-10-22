import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contact, Contacts, User } from '../models/User';
import { selectUser } from '../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIService {
  constructor(
    private httpClient: HttpClient,
    private store: Store
  ) { }


  public login(email: string, password: string): Observable<any> {
    let userEmail = email.toLowerCase();
    let url: string = environment.baseUrl + '/account/login'
    let body = {
      email: userEmail,
      password: password
    }
    return this.httpClient.post(url, body)
  }

  public registerUser(
    email: string, username: string, password: string
  ): Observable<any> {

    let url: string = environment.baseUrl + '/account/register'
    let userEmail = email.toLowerCase();
    let body = {
      email: userEmail,
      name: username,
      password: password
    }
    return this.httpClient.post(url, body)
  }

  public updateUsername(data: {
    id: string, password: string, newUsername: string
  }): Observable<any> {
    let body: User
    body = this.fillBody()
    body.name = data.newUsername


    return this.updateServer(body)
  }

  public updatePassword(data: {
    id: string, password: string, newPassword: string
  }): Observable<any> {
    let body: User
    body = this.fillBody()
    body.name = data.password


    return this.updateServer(body)
  }

  public updateEmail(data: {
    id: string, password: string, newEmail: string
  }): Observable<any> {
    let body: User
    body = this.fillBody()
    body.name = data.newEmail


    return this.updateServer(body)
  }

  public updatePhoneNumber(data: {
    id: string, password: string, newPhoneNumber: string
  }): Observable<any> {
    let body: User
    body = this.fillBody()
    body.name = data.newPhoneNumber

    return this.updateServer(body)
  }

  public addNewContact(data: {
    id: string, contact: Contact
  }): Observable<any> {
    let body: User
    body = Object.assign({},this.fillBody())
    let contacts = Object.assign([],body.contacts)
    contacts.push(data.contact)
    body.contacts = contacts

    return this.updateServer(body)
  }

  public updateContacts(data: {id: string, contacts: Contacts
  }): Observable<any> {
    let body: User
    body = this.fillBody()
    body.contacts = data.contacts


    return this.updateServer(body)
  }

  private updateServer(body:User) {
    let url: string = environment.baseUrl + '/users/update/' + body.id
    console.log('here');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      })
    }

    return this.httpClient.put(url, body, httpOptions).pipe(
      switchMap((userReply) => {
        let user = userReply

        if (user) {
          return of(user)
        } else return throwError("Can't find user")
      })
    )
  }

  private fillBody(): User {
    let user: User
    this.store.select(selectUser).subscribe(data =>
      user = Object.assign({}, data)
    )
    return user
  }
}
