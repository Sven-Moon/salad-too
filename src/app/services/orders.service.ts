import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem, CartItems, Items } from '../models/Item';
import { Order, Orders } from '../models/Order';
import { Contact, User } from '../models/User';
import { updateCartItemOwner } from '../modules/order/state/cart/cart.actions';
import { selectCartItems, selectLastItemOwner } from '../modules/order/state/cart/cart.selectors';
import { selectAllItems } from '../modules/order/state/staticData/static-data.selectors';
import { updateOrderStatus } from '../modules/orders/state/orders.actions';
import { selectOrders } from '../modules/orders/state/orders.selectors';

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
