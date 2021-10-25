import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { Store } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthResp } from '../models/Auth';
import { User } from '../models/User';
import { Contact } from '../models/Contact';
import { clearCart, updateLastOwner } from '../modules/order/state/cart/cart.actions';
import { clearItem } from '../modules/order/state/item/item.actions';
import { setGuestId } from '../store/auth/auth.actions';
import { selectUser } from '../store/auth/auth.selectors';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private alertService: AlertService,
    private modalService: BsModalService,
    private route: Router,
    private store: Store,
    private orderService: OrderService
  ) { }

  public failedLogin(): void {
    this.modalService.hide()
    this.alertService.danger('We couldn\'t log you in. Feel free to try again.')
  }
  public logout() {
    // *****************
    // 1) clear item and cart
    // 2) set the user as the guest id
    // 3) set the last owner as the user

    let id = this.generateId()
    let guestUser: User

    // 1) clear item and cart
    this.store.dispatch(clearItem())
    this.store.dispatch(clearCart())
    // 2) set the user as the guest id
    this.store.dispatch(setGuestId({ id }))
    // 3) set the last owner as the user & clear contacts
    this.store.select(selectUser).subscribe(user => guestUser = user)
    this.store.dispatch(updateLastOwner({ data: guestUser }))
    this.route.navigate(['/order/launch'])
    this.alertService.success('You have been successfully logged out')
  }

  public processRegisteredUser(resp: AuthResp): void {
    // alert user is registered
    this.alertService.success(
      `Congrats, ${resp.name}, you are now a member of our hunger satisfaction site!`
    )
    // go through login process
    this.orderService.processLoginSuccess(resp)
  }

  public alertFailedUserRegister(error: HttpErrorResponse) {
    let message = error.status + ": " + error.statusText
    this.alertService.danger(`We couldn\'t register you. Feel free to try again. \n
      Error: \n
      ${message}`)
  }

  public generateId(): string {
    // returns an 8-digit number to be appended to 'guest'
    let id = (Math.random() * 1E8).toFixed(0).toString()
    let size = 8
    while (id.length > size) {
      id = "0" + id
    }
    return id
  }

  public alertContactAdded(contact: Contact) {
    let emailLine = ""
    if (contact.email !== null) {
      emailLine = "\n(" + contact.email + ")"
    }
    this.alertService.success(
      "New Contact Added: \n" + contact.name
      + emailLine
    ),
      this.modalService.hide()
  }

  public alertUserUpdated( oldValue: string,
    newValue: string, field: string
  ): void {
    let newVal = newValue
    let oldVal = oldValue
    let message: string
    switch (field) {
      case 'password':
        message = "Password updated"
        break;
      case 'phone number':
        newVal = newValue.slice(0,3) + "-" +
          newValue.slice(3,6) + "-" +
          newValue.slice(6)
          message = "Phone number updated from "
          + oldVal + "to " + newVal
        break;
      case 'username':
        message = "Phone number updated from "
        + oldVal + "to " + newVal
    }
    this.alertService.success(message),
    this.modalService.hide()
  }

  public alertFailedAccountEdit(error: HttpErrorResponse) {
    console.log(error);

    this.alertService.danger(
      "Uh oh! Something didn't work there. \n" +
      "Error: " + error.error
    )
    this.modalService.hide()
  }
}
