import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contacts } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  baseUrl: 'localhost:3000/contacts/'
  body: {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public getContacts(contactList: Contacts,): Observable<any> {
    return this.httpClient.post(this.baseUrl, contactList, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred: ', error.error)
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      )
    }
    return throwError(
      'Bad things: Invalid contacts'
    )
  }
}
