import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Error } from "../../models/Error";
import { userData } from "../../models/StaticData";
import { User, Users } from "../../models/User";

/** **** DO NOT USE ****
 * This SHOULD NOT be necessary as the WebAPI that achieves this functionality
 * is operational.
 */

@Injectable({ providedIn: 'root' })
export class MockUserDataInterceptor implements HttpInterceptor {
  constructor(private store: Store<{}>) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (req.method === 'GET' && req.url.substring(0, 36) == 'https://localhost:3000/users/?email=') {

      const orderUserData = this.getUserData(req.url.substring(36))
      const response = new HttpResponse({
        body: orderUserData
      })
      return of(response)
    }
    return next.handle(req)
  }


  public getUserData(email: string): any {
    let data: Users = [
      {
        "id": "mikedanforth@npr.com",
        "name": "Mike Danforth",
        "phoneNumber": "987-654-3210",
        "email": "MikeDanforth@npr.com",
        "contacts": [
          {
            id: null,
            name: "Doug",
            email: null,
            img: "./assets/images/profile_1.png"
          },
          {
            id: null,
            name: "Peter",
            email: null,
            img: "./assets/images/profile_1.png"
          }
        ],
        "img": "./assets/images/profile_1.png"
      },
      {

        "id": "dougberman@npr.com",
        "name": "Doug",
        "phoneNumber": "987-654-3210",
        "email": "DougBerman@npr.com",
        "contacts": [
          {
            id: null,
            name: "Mike",
            email: null,
            img: "./assets/images/profile_1.png"
          },
          {
            id: null,
            name: "Bill",
            email: null,
            img: "./assets/images/profile_1.png"
          }
        ],
        "img": "./assets/images/profile_1.png"
      },
      {

        "id": "petersegal@npr.com",
        "name": "Peter",
        "phoneNumber": "987-654-1381",
        "email": "PeterSegal@npr.com",
        "contacts": [
          {
            id: null,
            name: "Mike",
            email: null,
            img: "./assets/images/profile_1.png"
          },
          {
            id: null,
            name: "Bill",
            email: null,
            img: "./assets/images/profile_1.png"
          },
          {
            id: null,
            name: "Martha",
            email: null,
            img: "./assets/images/profile_1.png"
          }
        ],
        "img": "./assets/images/profile_1.png"
      },
      {

        "id": "billburtis@npr.com",
        "name": "Bill",
        "phoneNumber": "987-654-1942",
        "email": "BillKurtis@npr.com",
        "contacts": [
          {
            id: null,
            name: "Martha",
            email: null,
            img: null
          }
        ],
        "img": "./assets/images/profile_1.png"
      },
    ]

    let user: User = data.find(user =>
      user.email.toLowerCase() === email.toLowerCase())


    if (user) {
      return user
    } else {
      throw new HttpErrorResponse({
        error: 'No user found',
        status: 500,
        statusText: 'Warning'
      })
    }

  }



} // get data
