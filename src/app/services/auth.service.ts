import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = 'https://localhost:3000/users/'
  body = {}

  public login(username: string, password: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + '?username=' + username).pipe(
      switchMap((users) => {
        let user = users[0];
        if (user) {
          return of(user);
        } else {
          return throwError('Unable to log in')
        }
      })
    )
  }

}
