import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { userData } from "../models/StaticData";

@Injectable({ providedIn: 'root' })
export class MockUserDataInterceptor implements HttpInterceptor {
  constructor(private store: Store<{}>) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (req.method === 'GET' && req.url == 'https://localhost:3000/users/') {
      const orderUserData = this.getUserData()
      const response = new HttpResponse({
        body: orderUserData
      })
      return of(response)
    }
    return next.handle(req)
  }


  public getUserData(): userData {
    console.log('TOUCHED!')
    let data: userData = {
      "users": [
        {
          "id": "abc123",
          "name": "Mike Danforth",
          "phoneNumber": "987-654-3210",
          "email": "MikeDanforth@npr.com",
          "contacts": ["abc124", "abc126"],
          "img": "./assets/images/profile.png"
        },
        {
          "id": "abc124",
          "name": "Doug Berman",
          "phoneNumber": "987-654-3210",
          "email": "DougBerman@npr.com",
          "contacts": ["abc124"],
          "img": "./assets/images/profile.png"
        },
        {
          "id": "abc125",
          "name": "Peter Segal",
          "phoneNumber": "987-654-1381",
          "email": "PeterSegal@npr.com",
          "contacts": ["abc124"],
          "img": "./assets/images/profile.png"
        },
        {
          "id": "abc126",
          "name": "Bill Kurtis",
          "phoneNumber": "987-654-1942",
          "email": "BillKurtis@npr.com",
          "contacts": ["abc124"],
          "img": "./assets/images/profile.png"
        },
      ],
      "contacts": [
        {
          "id": "abc126",
          "name": "Bill Kurtis",
          "phoneNumber": "987-654-1942",
          "img": "./assets/images/profile.png"
        },
        {
          "id": "abc124",
          "name": "Doug Berman",
          "phoneNumber": "987-654-3210",
          "img": "./assets/images/profile.png"
        },
        {
          "id": "abc125",
          "name": "Peter Segal",
          "phoneNumber": "987-654-1381",
          "img": "./assets/images/profile.png"
        },
        {
          "id": "abc025",
          "name": "Martha Stewart",
          "phoneNumber": "",
          "img": "./assets/images/profile.png"
        }
      ],
    }
    return data
  } // get data

}
