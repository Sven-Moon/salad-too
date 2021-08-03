import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as AccountActions from './account.actions';
import { AccountService } from 'src/app/services/account.service';



@Injectable()
export class AccountEffects {

  loadAccounts$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AccountActions.updateUserName),
      concatMap((action) =>
        this.accountService.updateUserName({
          name: action.name,
          id: action.user.email,
          password: action.user.password
        }).pipe(
          map(data => AccountActions.updateUserNameSuccess({ name: action.name })),
          catchError(error => of(AccountActions.updateUserNameFailure({ error }))))
      )
    );
  });



  constructor(
    private actions$: Actions,
    private accountService: AccountService) { }

}
