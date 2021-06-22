import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/internal/Observable';
import { loginAttempt, registerUser } from 'src/app/store/auth/auth.actions'

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


    let url = 'https://localhost:3000/users/?email='


    this.store.dispatch(loginAttempt({
      email: f.value.email,
      password: f.value.password
    }))
  }

  public cancel(): void {
    this.modalService.hide()
  }

  public signUp(f: NgForm) {

    this.store.dispatch(registerUser({
      username: f.value.username,
      password: f.value.password,
      confirmPassword: f.value.confirmPassword,
      email: f.value.email
    }))
  }


}
