import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from './products.reducer';

export const selectProductState = createFeatureSelector<fromProduct.State>(
  fromProduct.productFeatureKey
);

export const isProductsLoading = createSelector(
  selectProductState,
  (state) => state.loading
);

export const isProductsLoaded = createSelector(
  selectProductState,
  (state) => state.loaded
);

export const isProductLoading = createSelector(
  selectProductState,
  (state) => state.loadingProduct
);

export const isProductLoaded = createSelector(
  selectProductState,
  (state) => state.loadedProduct
);

export const fetchProductError = createSelector(
  selectProductState,
  (state) => state.error
);

export const fetchProduct = createSelector(
  selectProductState,
  (state) => state.product
);

export const fetchAllProducts = createSelector(
  selectProductState,
  fromProduct.select.selectAll
);

