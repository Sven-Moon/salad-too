
import { Injectable } from '@angular/core';
import { AlertService } from '@full-fledged/alerts';
import { BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private alertService: AlertService,
    private modalService: BsModalService
  ) { }

  public failedAccountEdit() {
    this.alertService.danger(
      "Uh oh! Something didn't work there. Try again?"
    )
    this.modalService.hide()
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
