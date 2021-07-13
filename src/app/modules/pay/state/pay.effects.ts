import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as PayActions from './pay.actions';



@Injectable()
export class PayEffects {

  loadPays$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(PayActions.attemptPayment),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => PayActions.paymentSuccess({ data })),
          catchError(error => of(PayActions.paymentFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) { }

}
