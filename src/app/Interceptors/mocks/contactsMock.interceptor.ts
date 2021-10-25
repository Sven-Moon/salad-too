import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Contact } from "src/app/models/Contact";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class ContactsMockInterceptor implements HttpInterceptor {
  constructor() { }

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let baseUrl = environment.baseUrl

    /** **** POST NEW CONTACT **** */
    if (req.method === 'POST' && req.url === baseUrl + '/users/contacts/add') {
      // const userData = this.getUserData(req.body.id)
      // interceptor reflects the indicated change back to client
      // as if it had changed it in a database
      const contact:Contact = req.body
      // if email is empty, replace with unique ID
      if (contact.id === null) {
        contact.id = this.generateRandomId()
      }
      const response = new HttpResponse({
        body: contact,
        status: 200
      })
      return of(response)
    }

    /** **** DELETE CONTACT ****
     * future:
     * requires user id & contact id to remove entry
     * from contacts_assoc table, which matches
     * contacts to users
     * for now:
     * requires contact id & reflects back so id may
     * be removed from local store
     */
    let deleteUrl = baseUrl + '/users/contacts/delete/'
    if (req.method === 'DELETE' && req.url.includes(deleteUrl)) {
      // interceptor reflects the indicated change back to client
      // as if it had changed it in a database
      console.log(req.url)
      // const id = req.url.match("/(?:\/contacts\/delete\/)([^\r\n])*/")
      const id = req.url.slice(req.url.lastIndexOf('/')+1)
      console.log(id)
      const response = new HttpResponse({
        body: { id: id },
        status: 200
      })
      return of(response)
    }

    return next.handle(req)
  }

  generateRandomId():string {
    let id: string = (Math.random() * 1E8).toFixed(0).toString()
    while (id.length > length) {
      id = "0" + id
    }
    return id
  }

}
