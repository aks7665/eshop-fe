import { createAction, props } from '@ngrx/store';
import { ErrorForm } from '../../models/error-form.model';
import { ProductCart } from '../../models/product.model';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: ProductCart }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ id: string }>()
);

export const updateCartItem = createAction(
  '[Cart] Update Cart',
  props<{ product: Partial<ProductCart> }>()
);

export const buyCartItem = createAction(
  '[Cart] Buy Cart Items',
  props<{ products: Partial<ProductCart>[] }>()
);

export const clearCart = createAction(
  '[Cart] Clear Cart'
);
