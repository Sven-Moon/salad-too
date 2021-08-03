import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  baseUrl: string = 'http://localhost:3000/users/account/'
  body: any = {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token'
    })
  }

  public updateUserName(data: { id: string, password: string, name: string }): Observable<any> {
    let findUser: string = '?email=' + data.id + '&password=' + data.password
    this.body = { name: data.id }

    return this.httpClient.patch(this.baseUrl + findUser, this.body, this.httpOptions)
      .pipe(
        switchMap((users) => {
          let user = users[0]
          if (user) {
            return of(user)
          } else return throwError('Can\'t find user')
        })
      )
  }

}
