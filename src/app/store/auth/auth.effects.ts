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


@Injectable()
export class AuthEffects {

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

  alertLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        this.alertService.success('You have successfully logged in!')
      })
    ),
    { dispatch: false }
  )

  setUserAsOwner$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        mergeMap((action) => [
          this.store.dispatch(setItemOwner({
            contact: {
              email: action.user.email,
              img: action.user.img,
              name: action.user.name
            }
          }))
        ])
      ),
    { dispatch: false }
  );

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
        this.alertService.danger('We couldn\'t log you in. Feel free to try again.')
      })
    ),
    { dispatch: false }
  )

  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.registerUser),
      switchMap((action) =>
        this.authAPIService.registerUser(action.email, action.username).pipe(
          map((user) => AuthActions.registerUserSuccess({ user })),
          catchError(error => of(AuthActions.registerUserFailure({ error })))
        )
      )
    )
  })

  editUserName$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AuthActions.updateUserName),
      concatMap((action) =>
        this.authAPIService.updateUserName({
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

  alertUsernameUpdated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updateUserNameSuccess),
        tap((action) => this.authService.updateUserNameSuccess(action.name))
      ),
    { dispatch: false }
  );

  alertAccountEditFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updateUserNameFailure),
        tap(() => this.authService.failedAccountEdit())
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private authAPIService: AuthAPIService,
    private modalService: BsModalService,
    private alertService: AlertService,
    private store: Store
  ) { }

}
