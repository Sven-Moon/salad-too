import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as PayActions from './pay.actions';
import * as CartActions from 'src/app/modules/order/state/cart/cart.actions'
import { PayService } from 'src/app/services/pay.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Payment } from 'src/app/models/Payment';
import { Store } from '@ngrx/store';



@Injectable()
export class PayEffects {

  attemptPay$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(PayActions.attemptPayment),
      mergeMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.payService$.pay({
          id: action.payment.id,
          amount: action.payment.amount,
          name: action.ccInfo.name,
          ccNum: action.ccInfo.ccNum,
          exp: action.ccInfo.exp,
          cvv: action.ccInfo.cvv
        }).pipe(
          map(data => PayActions.paymentSuccess({ data })),
          catchError(error => of(PayActions.paymentFailure({ error }))))
      )
    );
  });

  paySpinnerOn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PayActions.attemptPayment),
      tap(() => this.spinner.show()),
    ),
    { dispatch: false }
  );

  paySpinnerOff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PayActions.paymentSuccess, PayActions.paymentFailure),
      tap(() => {
        setTimeout(() => {
          this.spinner.hide()
          this.modalService.hide(120)
        }, 500)
      }),
    ),
    { dispatch: false }
  );

  successRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PayActions.paymentSuccess),
      tap((action) => {
        if (action.data.status === 'approved') {
          this.router.navigate(['/pay/success'])
        } else {
          this.router.navigate(['/pay/failed'])
        }
      })
    ),
    { dispatch: false }
  );

  processReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PayActions.paymentSuccess),
      tap((action) =>
        this.payService$.processReply(action.data)
      )
    ),
    { dispatch: false }
  )


  constructor(
    private actions$: Actions,
    private payService$: PayService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService
  ) { }

}
