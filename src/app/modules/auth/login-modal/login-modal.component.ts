import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { loginAttempt, registerUser, resetAuthError } from 'src/app/store/auth/auth.actions'
import { selectErrorMessage } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, OnDestroy {
  newUser: boolean = false
  errorMessage: String = ''
  form = {
    username: null,
    password: null,
    confirmPassword: null,
    newUser: false,
    email: null
  }

  constructor(
    private store: Store,
    public loginModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.newUser = false;
    this.store.select(selectErrorMessage).subscribe((message) => {
      this.errorMessage = message
    })
  }

  public onSubmit(f: NgForm): void {
    this.store.dispatch(loginAttempt({
      email: f.value.email,
      password: f.value.password
    }))
  }

  public signUp(f: NgForm) {

    /**
     * Attempts user POST
     * If duplicate found, returns duplicate error
     */
    this.store.dispatch(registerUser({
      username: f.value.username,
      email: f.value.email
    }))
  }

  ngOnDestroy():void {
    this.store.dispatch(resetAuthError())
  }


}
