
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


  public updateUserNameSuccess(name: string) {
    this.alertService.success(
      "Username updated. We\'ll call you " + name + " from now on!"
    ),
      this.modalService.hide()
  }

  public failedAccountEdit() {
    this.alertService.danger(
      "Uh oh! Something didn't work there. Try again?"
    )
    this.modalService.hide()
  }

}
