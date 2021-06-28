import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, tap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthService } from 'src/app/services/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';



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
      tap(() => this.modalService.hide(100))
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


  // registerUser$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(AuthActions.registerUser),
  //     concatMap((action) =>
  //       this.authService.registerUser(action.email, action.username).pipe(
  //         tap((user) => {
  //           // AuthActions.registerUserSuccess({ user }),
  //           console.log(user)
  //         }),
  //         // catchError(error => of(AuthActions.registerUserFailure({ error })))
  //       )
  //     )
  //   )
  // },
  //   { dispatch: false })

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private modalService: BsModalService
  ) { }

}
