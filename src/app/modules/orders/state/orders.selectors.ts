import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Order, Orders } from 'src/app/models/Order';
import { Payment } from 'src/app/models/Payment';
import * as fromOrders from './orders.reducer';

export const selectOrdersState = createFeatureSelector<fromOrders.State>(
  fromOrders.ordersFeatureKey
);

export const selectOrders = createSelector(
  selectOrdersState,
  (state): Orders => state.orders
)

export const selectSelectedOrderId = createSelector(
  selectOrdersState,
  (state): string => state.selectedOrderId
)

export const selectLastTransaction = createSelector(
  selectOrdersState,
  (state): Payment => state.lastTransaction
)

export const selectSelectedOrder = createSelector(
  selectOrders,
  selectSelectedOrderId,
  (orders, id): Order => orders.find(order => order.id == id)
)

export const selectReceipt = createSelector(
  selectSelectedOrder,
  selectLastTransaction,
  (order, lastTransaction) => {
    return {
      order: order,
      transaction: lastTransaction
    }
  }
)