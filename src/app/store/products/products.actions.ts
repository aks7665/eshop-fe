import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { ErrorForm } from '../../models/error-form.model';

// Fetch Products
export const loadingProducts = createAction(
  '[Product/Effect] Loading Products'
);
export const loadProducts = createAction(
  '[Product/Load All] Load Products',
  props<{ products: Product[] }>()
);

// Fetch Product
export const loadingProduct = createAction(
  '[Product/Effect] Loading Product',
  props<{ productId: string }>()
);
export const loadProduct = createAction(
  '[Product/Load All] Load Product',
  props<{ product: Product }>()
);

// Add Product
export const addProduct = createAction(
  '[Product/Effect] Add Product',
  props<{ product: Partial<Product>, image?: File }>()
);
export const addProductFailure = createAction(
  '[Product/Error] Add Product Failure',
  props<{ error: ErrorForm }>()
);
export const addProductSuccess = createAction(
  '[Product/Success] Add Product Success',
  props<{ product: Product }>()
);

// Update Product
export const updateProduct = createAction(
  '[Product/API] Update Product',
  props<{ productId: string, product: Partial<Product>, image?: File }>()
);
export const updateProductFailure = createAction(
  '[Product/Error] Update Product Failure',
  props<{ error: ErrorForm }>()
);
export const updateProductSuccess = createAction(
  '[Product/Success] Update Product Success',
  props<{ product: Product }>()
);

// Delete Product
export const deleteProduct = createAction(
  '[Product/Effect] Delete Product',
  props<{ id: string }>()
);

// Clear
export const clearProduct = createAction(
  '[Product] Clear Product'
);

export const clearProducts = createAction(
  '[Product] Clear Products'
);
