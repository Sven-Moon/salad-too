import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';
import * as AuthActions from 'src/app/store/auth/auth.actions'



@Injectable()
export class SpinnerEffects {

  spinnerOn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginAttempt),
        tap(() => {
          console.log('It\'s happening!')
        }),
        tap(() => this.spinner.show()
        )
      ),
    { dispatch: false }
  )

  spinnerOff$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure, AuthActions.loginSuccess),
        tap(() => {
          setTimeout(() => {
            this.spinner.hide()
          }, 2000);
        })
      ),
    { dispatch: false }
  )


  constructor(
    private actions$: Actions,
    private spinner: NgxSpinnerService
  ) { }

}
