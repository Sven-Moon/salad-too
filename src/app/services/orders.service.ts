import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateOrderStatus } from '../modules/orders/state/orders.actions';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private store: Store
  ) { }


  // ****************
  // (1) take an order id (string)
  // (2) after some seconds, change to Making
  // (3) after some seconds, change to Ready
  // (4) after some seconds, change to Delivered
  // 2-4 utilize a faked store
  // -- deliver an object to the store
  public advanceStatus(orderId: string) {
    setTimeout(() => {
      this.store.dispatch(updateOrderStatus({ orderId, status: 'Making' }))
      setTimeout(() => {
        this.store.dispatch(updateOrderStatus({ orderId, status: 'Ready' }))
        setTimeout(() => {
          this.store.dispatch(updateOrderStatus({ orderId, status: 'Delivered' }))
        }, 5000);
      }, 5000);
    }, 5000);
  }

}
