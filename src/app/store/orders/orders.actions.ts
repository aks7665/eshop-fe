import { createAction, props } from '@ngrx/store';
import { Order } from '../../models/order.model';

// Fetch Orders
export const loadingOrders = createAction(
  '[Order/Effect] Loading Orders'
);
export const loadOrders = createAction(
  '[Order/Load All] Load Orders',
  props<{ orders: Order[] }>()
);

export const clearOrders = createAction(
  '[Order] Clear Orders'
);
