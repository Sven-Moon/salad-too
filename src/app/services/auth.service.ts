
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { Store } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { AuthResp } from '../models/Auth';
import { Contact, User } from '../models/User';
import { clearCart, updateLastOwner } from '../modules/order/state/cart/cart.actions';
import { clearItem } from '../modules/order/state/item/item.actions';
import { registerUserSuccess, setGuestId } from '../store/auth/auth.actions';
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

  //#region --------- REGISTER

  public processRegisteredUser(resp: AuthResp): void {
    // set as user in store > registerUserSucces
    // registerUserSuccess is performed as part of registerUser$ (authEffects)
    // this.store.dispatch(registerUserSuccess({ user }))
    // alert user is registered
    this.alertService.success(
      `Congrats, ${resp.name}, you are now a member of our hunger satisfaction site!`
    )
    // go through login process
    this.orderService.processLoginSuccess(resp)
  }

  public failedUserRegister(data) {
    let message = 'Unknown Error'
    this.alertService.danger(`We couldn\'t register you. Feel free to try again. \n
      Check out this brutal error message we got: \n
      error: ${message}`)
  }

  //#endregion ------ register

  //#region --------- FAILED
  public failedLogin(): void {
    this.modalService.hide()
    this.alertService.danger('We couldn\'t log you in. Feel free to try again.')
  }

  public failedAccountEdit() {
    this.alertService.danger(
      "Uh oh! Something didn't work there. Try again?"
    )
    this.modalService.hide()
  }
  //#endregion ------ failed

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

  //#region USER NAME ------------------------
  public updateUserNameSuccess(name: string) {
    this.alertService.success(
      "Username updated. We\'ll call you " + name + " from now on!"
    ),
      this.modalService.hide()
  }
  //#endregion user name ---------------

  //#region PASSWORD ------------------------
  public updatePasswordSuccess() {
    this.alertService.success(
      "Password successfully updated to **********"
    ),
      this.modalService.hide()
  }
  //#endregion password ---------------

  //#region EMAIL ------------------------
  public updateEmailSuccess(email: string) {
    this.alertService.success(
      "Email updated: " + email
    ),
      this.modalService.hide()
  }
  //#endregion email ---------------

  //#region PHONE NUMBER ------------------------
  public updatePhoneNumberSuccess(phone: string) {
    this.alertService.success(
      "Phone Number updated to: ("
      + phone.slice(0, 3) + ")"
      + phone.slice(3, 6) + "-"
      + phone.slice(6, 10)
    ),
      this.modalService.hide()
  }
  //#endregion phone number ---------------

  //#region ADD CONTACT ------------------------
  public addNewContact(contact: Contact) {
    this.alertService.success(
      "New Contact Added: \n" + contact.name
      + "\n(" + contact.email + ")"
    ),
      this.modalService.hide()
  }
  //#endregion add contact ---------------

}
