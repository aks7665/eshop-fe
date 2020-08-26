import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrder from './orders.reducer';

export const selectOrderState = createFeatureSelector<fromOrder.State>(
  fromOrder.orderFeatureKey
);

export const isOrdersLoading = createSelector(
  selectOrderState,
  (state) => state.loading
);

export const isOrdersLoaded = createSelector(
  selectOrderState,
  (state) => state.loaded
);

export const fetchAllOrders = createSelector(
  selectOrderState,
  fromOrder.select.selectAll
);

