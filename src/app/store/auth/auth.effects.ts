import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, tap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as AuthActions from './auth.actions';
import * as SharedActions from 'src/app/modules/shared/state/shared.actions';
import { AuthService } from 'src/app/services/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from '@full-fledged/alerts';
import { NgxSpinnerService } from 'ngx-spinner';



@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginAttempt),
      concatMap((action) =>
        this.authService.login(action.email, action.password).pipe(
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

  alertLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        this.alertService.success('You have successfully logged in!')
      })
    ),
    { dispatch: false }
  )

  alertLoginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      tap(() => {
        this.alertService.danger('We couldn\'t log you in. Feel free to try again.')
      })
    ),
    { dispatch: false }
  )

  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.registerUser),
      switchMap((action) =>
        this.authService.registerUser(action.email, action.username).pipe(
          map((user) => AuthActions.registerUserSuccess({ user })),
          catchError(error => of(AuthActions.registerUserFailure({ error })))
        )
      )
    )
  })

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private modalService: BsModalService,
    private alertService: AlertService
  ) { }

}
