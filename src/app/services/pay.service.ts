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
      this.store.dispatch(updateOrderStatus({
        orderId: data.orderId, status: 'Paid'
      }))
      this.store.dispatch(updateOrderReceived({ data: data }))
      this.store.dispatch(clearCart())
      this.orderService.advanceStatus(data.orderId)
    }
  }
}
