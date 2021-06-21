import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Error } from "../models/Error";
import { userData } from "../models/StaticData";
import { User } from "../models/User";

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
    console.log('TOUCHED!')
    let data: userData = {
      "users": [
        {
          "name": "Mike Danforth",
          "phoneNumber": "987-654-3210",
          "email": "MikeDanforth@npr.com",
          "contacts": ["abc124", "abc126"],
          "img": "./assets/images/profile_1.png"
        },
        {
          "name": "Doug Berman",
          "phoneNumber": "987-654-3210",
          "email": "DougBerman@npr.com",
          "contacts": ["MikeDanforth@npr.com, BillKurtis@npr.com"],
          "img": "./assets/images/profile_1.png"
        },
        {
          "name": "Peter Segal",
          "phoneNumber": "987-654-1381",
          "email": "PeterSegal@npr.com",
          "contacts": ["MikeDanforth@npr.com, PeterSegal@npr.com"],
          "img": "./assets/images/profile_1.png"
        },
        {
          "name": "Bill Kurtis",
          "phoneNumber": "987-654-1942",
          "email": "BillKurtis@npr.com",
          "contacts": ["marthaStewart@homes.com"],
          "img": "./assets/images/profile_1.png"
        },
      ],
      "contacts": [
        {
          "email": "BillKurtis@npr.com",
          "name": "Bill Kurtis",
          "img": "./assets/images/profile_1.png"
        },
        {
          "email": "DougBerman@npr.com",
          "name": "Doug Berman",
          "img": "./assets/images/profile_1.png"
        },
        {
          "email": "PeterSegal@npr.com",
          "name": "Peter Segal",
          "img": "./assets/images/profile_1.png"
        },
        {
          "email": "marthaStewart@homes.com",
          "name": "Martha Stewart",
          "img": "./assets/images/profile_1.png"
        }
      ],
    }

    let user: User = data.users.find(user =>
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
