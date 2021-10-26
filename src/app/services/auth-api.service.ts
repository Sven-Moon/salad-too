import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Contact } from '../models/Contact';
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

  public updateUser(user: User, password: string) {
    let url: string = environment.baseUrl + '/users/update/' + user.id
    return this.httpClient.put(url, user)
  }

  public addContact(contact: Contact): Observable<any> {
    let url: string = environment.baseUrl + '/users/contacts/add'
    let body = { id: contact.id, name: contact.name, email: contact.email, img: contact.img }
    return this.httpClient.post(url, body)
  }

  public deleteContact(id: string): Observable<any> {
    let url: string = environment.baseUrl + '/users/contacts/delete/' + id
    return this.httpClient.delete(url)
  }

  private updateServer(body:User) {
    let url: string = environment.baseUrl + '/users/update/' + body.id
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
