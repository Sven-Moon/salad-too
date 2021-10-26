import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Contact, Contacts } from '../models/Contact';
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
    email: string, username: string, password: string, contacts:Contacts
  ): Observable<any> {
    let url: string = environment.baseUrl + '/account/register'
    let userEmail = email.toLowerCase();
    let body = {
      email: userEmail,
      name: username,
      password: password,
      contacts: contacts
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
}
