import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/internal/Observable';
import { loginAttempt } from 'src/app/store/auth/auth.actions'

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  modalRef: BsModalRef
  newUser: boolean = false
  form = {
    username: null,
    password: null,
    confirmPassword: null,
    newUser: false,
    email: null
  }

  constructor(
    private modalService: BsModalService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.newUser = false;
  }

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template)
  }

  public onSubmit(f: NgForm): void {
    console.log('Submitted!')
    this.store.dispatch(loginAttempt({
      username: f.value.username,
      password: f.value.password
    }))
  }

  public cancel(): void {
    this.modalService.hide()
  }

  tellme(f: NgForm) {
    console.log(f)
    console.log(f.controls.password.value != f.controls.confirmPassword.value)
  }


}
