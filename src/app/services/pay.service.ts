import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CartItems } from '../models/Item';
import { Order, OrderStatus } from '../models/Order';
import { ccPayment, Payment, Payments } from '../models/Payment';
import { clearCart, removePaidItemsFromCart } from '../modules/order/state/cart/cart.actions';
import { selectCartItems } from '../modules/order/state/cart/cart.selectors';
import { addPayment, updateLastTransaction, updateOrderReceived, updateOrderStatus, updateSelectedOrderId } from '../modules/orders/state/orders.actions';
import { OrdersService } from './orders.service';


@Injectable({
  providedIn: 'root'
})
export class PayService {


  constructor(
    private httpClient: HttpClient,
    private store: Store,
    private orderService: OrdersService
  ) {
  }



  public pay(ccPayment: ccPayment): Observable<any> {
    let url: string = environment.baseUrl + '/payments'

    return this.httpClient.post(url, ccPayment)
      // .pipe(
      //   switchMap((resp) => {
      //     let payReply = this.buildReplyObj(ccPayment)
      //     if (ccPayment) {
      //       return of(resp)
      //     } else return throwError('Unknown Server Error')
      //   }),
      //   catchError(this.handleLoginError)
      // )
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

  public processReply(data: Payment): void {
    // ***************************************
    // called from effect on payment success
    // (1) add transaction to transaction list & update status
    // (2) clear the cart
    // (x) Navigate to success page to display receipt (handled by effect)

    let matchingOrder: Order
    this.store.dispatch(updateSelectedOrderId({ id: data.orderId }))
    this.store.dispatch(updateLastTransaction({ transaction: data }))
    this.store.dispatch(addPayment({ payment: data }))

    // if the status came back paid,
    if (data.status === 'approved') {
      let cartItems: CartItems
      this.store.select(selectCartItems).subscribe(items =>
        cartItems = items
      )
      this.store.dispatch(updateOrderStatus({
        orderId: data.orderId, status: 'Paid'
      }))
      this.store.dispatch(updateOrderReceived({ data: data }))
      this.store.dispatch(clearCart())
      this.orderService.advanceStatus(data.orderId)
    }
  }
}
