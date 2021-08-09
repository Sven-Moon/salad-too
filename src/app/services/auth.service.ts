
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { Store } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { User } from '../models/User';
import { clearCart, updateLastOwner } from '../modules/order/state/cart/cart.actions';
import { clearItem } from '../modules/order/state/item/item.actions';
import { setGuestId } from '../store/auth/auth.actions';
import { selectUser } from '../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private alertService: AlertService,
    private modalService: BsModalService,
    private route: Router,
    private store: Store
  ) { }

  public failedAccountEdit() {
    this.alertService.danger(
      "Uh oh! Something didn't work there. Try again?"
    )
    this.modalService.hide()
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
    // 3) set the last owner as the user
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
      + phone.slice(0, 2) + ")"
      + phone.slice(3, 5) + "-"
      + phone.slice(6, 9)
    ),
      this.modalService.hide()
  }
  //#endregion phone number ---------------

}
