import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';
import { Orders, OrderStatus } from 'src/app/models/Order';
import { Payment } from 'src/app/models/Payment';
import * as OrdersActions from './orders.actions';

export const ordersFeatureKey = 'orders';

export interface State {
  orders: Orders
  selectedOrderId: string
  lastTransaction: Payment
}

export const initialState: State = {
  orders: [],
  selectedOrderId: null,
  lastTransaction: null
};


export const reducer = createReducer(
  initialState,

  mutableOn(OrdersActions.createOrder, (state, action) => {
    state.orders.push(action.order)
  }),
  on(OrdersActions.updateSelectedOrderId, (state, action) => ({
    ...state,
    selectedOrderId: action.id
  })),
  on(OrdersActions.updateLastTransaction, (state, action) => ({
    ...state,
    lastTransaction: action.transaction
  })),
  mutableOn(OrdersActions.addPayment, (state, action) => {
    state.orders.find(order =>
      order.id === action.payment.orderId).payments.push(action.payment)
  }),
  mutableOn(OrdersActions.updateOrderStatus, (state, action) => {
    state.orders.find(order =>
      order.id === action.orderId).status = action.status
  }),
  mutableOn(OrdersActions.updateOrderReceived, (state, action) => {
    state.orders.find(order =>
      order.id === action.data.orderId).received = action.data.dateTime
  }),
  on(OrdersActions.loadOrders, state => state),
  mutableOn(OrdersActions.toggleOrderFavorite, (state, action) => {
    state.orders.find(order => order.id === action.id).favorite
      = !state.orders.find(order => order.id === action.id).favorite
  })
);

