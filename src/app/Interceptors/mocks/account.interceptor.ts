import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { AuthReg } from "src/app/models/Auth";
import { User, Users } from "src/app/models/User";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class AccountMockInterceptor implements HttpInterceptor {
  constructor() { }

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (
      req.method === 'POST' &&
      req.url == environment.baseUrl + '/account/login'
    ) {
      const user = this.getUserData(req.body)
      const response = new HttpResponse({
        body: user
      })
      return of(response)
    }

    if (
      req.method === 'POST' &&
      req.url == environment.baseUrl + '/account/register'
    ) {

      if (req.body.email === null || req.body.name === null || req.body.password === null) {
        throw new HttpErrorResponse(this.nullFieldError)
       }

      let newUser: User = {
        id: req.body.email,
        name: req.body.name,
        phoneNumber: null,
        email: req.body.email,
        img: './assets/images/profile_1.png'
       }
      const response = new HttpResponse({
        body: newUser
      })
      return of(response)
    }

    return next.handle(req)
  }


  /** returns User or throws userNotFound error */
  public getUserData(req: AuthReg): User | null  {
    let data: Users = this.userData

    let user: User = data.find(user =>
      user.email.toLowerCase() === req.email.toLowerCase()
    )

    if (user && user.password === req.password) {
      let userDto = {
        id: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        contacts: user.contacts,
        img: user.img
      }
      return userDto
    }
    else throw new HttpErrorResponse(this.userNotFoundError)
  }


  // VARIABLES
  nullFieldError = {
    error: "Required field null",
    status: 500,
    statusText: "Email, name, and password must be non-null"
  }
  userNotFoundError = {
      error: "User Not Found",
      status: 401,
      statusText: "That user/password combination was not found."
  }
  userData: Users = [
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
        "img": "./assets/images/profile_1.png",
        "password": "abc123A!!"
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
        "img": "./assets/images/profile_1.png",
        "password": "abc123A!!"
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
        "img": "./assets/images/profile_1.png",
        "password": "abc123A!!"
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
        "img": "./assets/images/profile_1.png",
        "password": "abc123A!!"
      },
  ]

}
