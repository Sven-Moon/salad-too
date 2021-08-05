import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { loginAttempt, registerUser } from 'src/app/store/auth/auth.actions'

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
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
    private store: Store,
    public loginModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.newUser = false;
  }

  public onSubmit(f: NgForm): void {
    this.store.dispatch(loginAttempt({
      email: f.value.email,
      password: f.value.password
    }))
  }

  public signUp(f: NgForm) {

    this.store.dispatch(registerUser({
      username: f.value.username,
      email: f.value.email
    }))
  }


}
