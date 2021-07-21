import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ccPayment, Payment, Payments } from '../models/Payment';
import { removePaidItemsFromCart } from '../modules/order/state/cart/cart.actions';
import { updateIsSelected, updateItemsByOwnerPayStatus, updatePaymentsStatus } from '../modules/pay/state/pay.actions';
import { selectPayments } from '../modules/pay/state/pay.selectors';

@Injectable({
  providedIn: 'root'
})
export class PayService {
  payments: Payments


  constructor(
    private httpClient: HttpClient,
    private store: Store
  ) {
    this.store.select(selectPayments).subscribe(existingPayments =>
      this.payments = existingPayments
    )
  }

  baseUrl: string = 'http://localhost:3000/payments'
  body = {}

  public pay(ccPayment: ccPayment,): Observable<any> {
    return this.httpClient.post(this.baseUrl, ccPayment)
      .pipe(
        switchMap(() => {
          let payReply = this.buildReplyObj(ccPayment)
          if (ccPayment) {
            return of(payReply)
          } else return throwError('Unknown Server Error')
        }),
        catchError(this.handleLoginError)
      )
  }

  private handleLoginError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Client side or network error occurred.
      console.error('An error occurred: ', error.error)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what's wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      )
    }
    // Return an observable with a user facing error message
    return throwError('Unknown Server Error')
  }

  private buildReplyObj(info: ccPayment): Payment {
    return {
      id: info.id,
      amount: info.amount,
      status: this.randSuccess(),
    }
  }


  private randSuccess(): string {
    let success: boolean = Math.random() % 2 < .95
    return success
      ? 'approved'
      : 'declined'
  }

  public processReply(data: Payment): void {
    // queue up the matching payment
    let matchingPayment: Payment = this.payments.find(payment =>
      payment.id === data.id
    )
    // update the recorded payment transaction status in store:pay
    this.store.dispatch(updatePaymentsStatus({
      id: data.id,
      status: data.status
    }))
    // if the status came back paid,
    if (data.status === 'approved') {
      // update owner items isPaid status to true
      // this moves their items to paid on the pay choose screen
      this.store.dispatch(updateItemsByOwnerPayStatus({ id: data.id }))
      // remove the items from the cart (they can't be modified now)
      let ownerEmails = matchingPayment.ownerSet
      this.store.dispatch(removePaidItemsFromCart({ ownerEmails }))
      // deselect the selected owners
      matchingPayment.ownerSet.forEach(owner =>
        this.store.dispatch(updateIsSelected({ id: owner, selected: false }))
      )
    }
  }




}
