import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { User, Users } from "src/app/models/User";
import { environment } from "src/environments/environment";
import { StaticData } from "../../models/StaticData";
import { userData } from "./data/userData";

@Injectable({ providedIn: 'root' })
export class UsersMockInterceptor implements HttpInterceptor {
  constructor(private store: Store<{}>) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let urlMatchy: boolean = req.url.includes('/users/update')
    if (req.method === 'PUT' && urlMatchy) {
      // const userData = this.getUserData(req.body.id)
      // interceptor reflects the indicated change back to client
      // as if it had changed it in a database
      const userData = req.body
      const response = new HttpResponse({
        body: userData,
        status: 200
      })
      return of(response)
    }

    return next.handle(req)
  }


  /**
   * matches email, returning user object if found
   * returns error if user email not found
   */
  public getUserData(id: string): any {
    let allUsers: Users = userData
    let user: User
    user = allUsers.find((user: User) =>
      user.id.toLowerCase() === id.toLowerCase()
    )

    if (user !== undefined) {
      return user
    } else {
      throw new HttpErrorResponse({
        error: 'No user found',
        status: 500,
        statusText: "The sent user was not matched in the 'database'"
      })
    }

  }

}
