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
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthResp } from 'src/app/models/Auth';
import { User } from 'src/app/models/User';


@Injectable()
export class AuthEffects {

  //#region ------------ LOGIN
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginAttempt),
      concatMap((action) =>
        this.authAPIService.login(action.email, action.password).pipe(
          map((resp: AuthResp) => AuthActions.loginSuccess({ resp })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
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
      tap((action) => this.orderService.processLoginSuccess(action.resp))
    ),
    { dispatch: false }
  )

  welcomeBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) =>
          this.alertService.success(
            'Welcome Back ' + action.resp.name + ' !'
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
        this.authAPIService.registerUser(action.email, action.username, action.password).pipe(
          map((resp) => AuthActions.registerUserSuccess({ resp })),
          catchError((error) => of(AuthActions.registerUserFailure({ error })))
        )
      )
    )
  })

  registerUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUserSuccess),
      // handles alert service & login to order component
      tap((data) => { this.authService.processRegisteredUser(data.resp) })
    ),
    { dispatch: false }
  )

  registerUserFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUserFailure),
      tap((data) => { this.authService.alertFailedUserRegister(data.error) })
    ),
    { dispatch: false }
  )
  //#endregion ------------ register user

  addContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.addContact),
      concatMap((action) =>
        this.authAPIService.addContact(action.email, action.name, action.img).pipe(
          map((contact) => AuthActions.addContactSuccess({ contact })),
          catchError((error) => of(AuthActions.addContactFailure({ error })))
        )
      )
    )
  })

  alertContactsUpdated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.addContactSuccess),
        tap((action) => this.authService.alertContactAdded(action.contact))
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(AuthActions.updateUser),
        concatMap((action) =>
          this.authAPIService.updateUser(action.user, action.password).pipe(
            map(
              (user: User) => AuthActions.updateUserSuccess({
                user, oldValue: action.oldValue,
                newValue: action.newValue, field: action.field
              })),
            catchError(error => of(AuthActions.updateUserFailure({ error }))))
          ),
    );
  });

  alertUpdateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUserSuccess),
      tap((action) => {
        this.authService.alertUserUpdated(
        action.oldValue,
        action.newValue,
        action.field)
      })
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
    private orderService: OrderService
  ) { }

}
