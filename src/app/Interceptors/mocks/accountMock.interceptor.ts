import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse, HttpErrorResponse }
  from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AuthReg } from "src/app/models/Auth";
import { User, Users } from "src/app/models/User";
import { environment } from "src/environments/environment";
import { nullFieldError, userAlreadyExistsError, userNotFoundError }
  from "./data/errorMocks";
import { userData } from "./data/userData";

@Injectable({ providedIn: 'root' })
export class AccountMockInterceptor implements HttpInterceptor {
  constructor() { }

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      /** ****  LOGIN **** */
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

    /** **** REGISTER **** */
    if (
      req.method === 'POST' &&
      req.url == environment.baseUrl + '/account/register'
    ) {
      this.checkForNullFields(req.body.email, req.body.name,req.body.password)
      this.checkIfUserExists(req.body.email)

      let newUser: User = this.setUser(req)

      const response = new HttpResponse({
        body: newUser
      })
      return of(response)
    }

    return next.handle(req)
  }


  /** login: returns User or throws userNotFound error */
  public getUserData(req: AuthReg): User | null  {
    let data: Users = userData // see mocks/data/userData
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
    else throw new HttpErrorResponse(userNotFoundError)
  }

  private checkForNullFields(email, name, password) {
    if (email === null || name === null || password === null)
      throw new HttpErrorResponse(nullFieldError)
  }

  private checkIfUserExists(email: string) {
    let existingUser: boolean = false
    userData.forEach(user =>
      user.id === email
        ? existingUser = true
        : null
    )
    if (existingUser) {
      throw new HttpErrorResponse(userAlreadyExistsError)
    }
  }

  private setUser(req): User {
    return {
      id: req.body.email,
      name: req.body.name,
      phoneNumber: null,
      email: req.body.email,
      img: './assets/images/profile_1.png',
      contacts: req.body.contacts
    }
  }


}
