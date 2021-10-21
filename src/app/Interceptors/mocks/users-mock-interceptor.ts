import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { User, Users } from "src/app/models/User";
import { environment } from "src/environments/environment";
import { StaticData } from "../../models/StaticData";

@Injectable({ providedIn: 'root' })
export class UsersMockInterceptor implements HttpInterceptor {
  constructor(private store: Store<{}>) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (req.method === 'GET' && req.url == environment.baseUrl + '/users') {
      const userData = this.getUserData(req.body.email)
      const response = new HttpResponse({
        body: userData
      })
      return of(response)
    }

    return next.handle(req)
  }


  /**
   * matches email, returning user object if found
   * returns error if user email not found
   */
  public getUserData(email: string): any {
    let data: Users = [
      {
        "id": "mikedanforth@npr.com",
        "name": "Mike Danforth",
        "phoneNumber": "987-654-3210",
        "email": "MikeDanforth@npr.com",
        "contacts": [
          {
            name: "Doug",
            email: null,
            img: "./assets/images/profile_1.png"
          },
          {
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
            name: "Mike",
            email: null,
            img: "./assets/images/profile_1.png"
          },
          {
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
            name: "Mike",
            email: null,
            img: "./assets/images/profile_1.png"
          },
          {
            name: "Bill",
            email: null,
            img: "./assets/images/profile_1.png"
          },
          {
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

}
