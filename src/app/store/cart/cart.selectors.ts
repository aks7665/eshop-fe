import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCart from './cart.reducer';

export const selectCartState = createFeatureSelector<fromCart.State>(
  fromCart.cartFeatureKey
);

export const fetchCart = createSelector(
  selectCartState,
  fromCart.select.selectAll
);

export const isCartLoading = createSelector(
  selectCartState,
  (state) => state.loading
);
