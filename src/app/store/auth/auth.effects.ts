import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthService } from 'src/app/services/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from '@full-fledged/alerts';
import { Store } from '@ngrx/store';
import { setItemOwner } from 'src/app/modules/order/state/item/item.actions';
import { AuthAPIService } from 'src/app/services/auth-api.service';
import { OrderService } from 'src/app/services/order.service';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class AuthEffects {

  //#region ------------ LOGIN
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginAttempt),
      concatMap((action) =>
        this.authAPIService.login(action.email, action.password).pipe(
          map((user) => AuthActions.loginSuccess({ user })),
          catchError(error => of(AuthActions.loginFailure({ error }))))
      )
    );
  });

  hideLoginModal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess, AuthActions.registerUserSuccess),
      tap(() => this.modalService.hide(100)),
    ),
    { dispatch: false }
  )


  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap((action) => this.orderService.processLoginSuccess(action.user))
    ),
    { dispatch: false }
  )

  welcomeBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) =>
          this.alertService.success(
            'Welcome Back ' + action.user.name + ' !'
          )
        )
      ),
    { dispatch: false }
  );

  alertLoginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      tap(() => {
        this.authService.failedLogin()
      })
    ),
    { dispatch: false }
  )
  //#endregion ------------ login

  //#region ------------ REGISTER USER
  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.registerUser),
      concatMap((action) =>
        this.authAPIService.registerUser(action.email, action.username).pipe(
          map((user) => AuthActions.registerUserSuccess({ user })),
          catchError((error) => of(AuthActions.registerUserFailure({ error })))
        )
      )
    )
  })

  registerUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUserSuccess),
      // handles alert service & login to order component
      tap((data) => { this.authService.processRegisteredUser(data.user) })
    ),
    { dispatch: false }
  )

  registerUserFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUserFailure),
      tap((data) => { this.authService.failedUserRegister(data) })
    ),
    { dispatch: false }
  )
  //#endregion ------------ REGISTER USER

  //#region ------------ EDIT ACCOUNT
  editUserName$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AuthActions.updateUserName),
      concatMap((action) =>
        this.authAPIService.updateUsername({
          id: action.id,
          password: action.password,
          newUsername: action.newUsername
        }).pipe(
          map(data => AuthActions.updateUserNameSuccess({ id: data.id, name: data.name, })),
          catchError(error => of(AuthActions.updateUserNameFailure({ error })))
        )
      )
    );
  });

  editPassword$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AuthActions.updatePassword),
      concatMap((action) =>
        this.authAPIService.updatePassword({
          id: action.id,
          password: action.password,
          newPassword: action.newPassword
        }).pipe(
          map(data => AuthActions.updatePasswordSuccess()),
          catchError(error => of(AuthActions.updatePasswordFailure({ error })))
        )
      )
    );
  });

  editEmail$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AuthActions.updateEmail),
      concatMap((action) =>
        this.authAPIService.updateEmail({
          id: action.id,
          password: action.password,
          newEmail: action.newEmail
        }).pipe(
          map(data => AuthActions.updateEmailSuccess({
            id: data.id,
            email: data.email,
          })),
          catchError(error => of(AuthActions.updateEmailFailure({ error })))
        )
      )
    );
  });

  editPhoneNumber$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AuthActions.updatePhone),
      concatMap((action) =>
        this.authAPIService.updatePhoneNumber({
          id: action.id,
          password: action.password,
          newPhoneNumber: action.newPhone
        }).pipe(
          map(data => AuthActions.updatePhoneSuccess({ id: data.id, phoneNumber: data.phoneNumber, })),
          catchError(error => of(AuthActions.updatePhoneFailure({ error })))
        )
      )
    );
  });

  addNewContact$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AuthActions.addNewContact),
      concatMap((action) =>
        this.authAPIService.addNewContact({
          id: action.id,
          contacts: action.contacts
        }).pipe(
          map(data => AuthActions.addNewContactSuccess({
            id: data.id,
            contacts: data.contacts
          })),
          catchError(error => of(AuthActions.addNewContactFailure({ error })))
        )
      )
    );
  });
  //#endregion ------------ ACCOUNT USER

  //#region ------------- EDIT ACCOUNT FAILURE
  alertAccountEditFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.updateUserNameFailure,
          AuthActions.updatePasswordFailure,
          AuthActions.updateEmailFailure,
          AuthActions.updatePhoneFailure,
          AuthActions.addContact),
        tap(() => this.authService.failedAccountEdit())
      ),
    { dispatch: false }
  );
  //#endregion ---------- EDIT ACCOUNT FAILURE

  //#region ------------- EDIT ACCOUNT SUCCESS

  alertUsernameUpdated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updateUserNameSuccess),
        tap((action) => this.authService.updateUserNameSuccess(action.name))
      ),
    { dispatch: false }
  );

  alertPasswordUpdated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updatePasswordSuccess),
        tap(() => this.authService.updatePasswordSuccess())
      ),
    { dispatch: false }
  );

  alertEmailUpdated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updateEmailSuccess),
        tap((action) => this.authService.updateEmailSuccess(action.email))
      ),
    { dispatch: false }
  );

  alertPhoneNumberUpdated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updatePhoneSuccess),
        tap((action) => this.authService.updatePhoneNumberSuccess(action.phoneNumber))
      ),
    { dispatch: false }
  );

  alertContactsUpdated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.addNewContactSuccess),
        tap((action) => this.authService.addNewContact(action.contacts[action.contacts.length - 1]))
      ),
    { dispatch: false }
  );
  //#endregion ----------------- EDIT ACCOUNT SUCCESS

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private authAPIService: AuthAPIService,
    private modalService: BsModalService,
    private alertService: AlertService,
    private store: Store,
    private orderService: OrderService
  ) { }

}
