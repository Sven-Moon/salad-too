import { createAction, props } from '@ngrx/store';
import { Order, OrderStatus } from 'src/app/models/Order';
import { Payment } from 'src/app/models/Payment';



export const createOrder = createAction(
  '[Pay-Info] Add Order',
  props<{ order: Order }>()
);

export const updateSelectedOrderId = createAction(
  '[Pay Service] Update Selected Order ID',
  props<{ id: string }>()
);

export const updateLastTransaction = createAction(
  '[Pay Service] Update Last Transaction ID',
  props<{ transaction: Payment }>()
);

export const updateOrder = createAction(
  '[Pay Service] Update Order',
  props<{ order: Order }>()
);

export const updateOrderStatus = createAction(
  '[Pay Service] Update Order Status',
  props<{ orderId: string, status: OrderStatus }>()
);

export const addPayment = createAction(
  '[Pay Service] Update Order with Payment',
  props<{ payment: Payment }>()
);

export const loadOrders = createAction(
  '[Order API] Load Orders'
);

export const updateOrderReceived = createAction(
  '[Pay Success Service] Update Order Received',
  props<{ data: Payment }>()
);

export const toggleOrderFavorite = createAction(
  '[Orders History] Toggle order favorite',
  props<{ id: string }>()
)

