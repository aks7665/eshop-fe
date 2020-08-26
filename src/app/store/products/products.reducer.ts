import { Action, createReducer, on } from '@ngrx/store';
import * as ProductActions from './products.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../../models/product.model';
import { ErrorForm } from '../../models/error-form.model';

export const productFeatureKey = 'product';

// tslint:disable-next-line: no-empty-interface
export interface State { }

export interface State extends EntityState<Product> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  product: Product;
  loadingProduct: boolean;
  loadedProduct: boolean;
  error: ErrorForm;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  // sortComparer: compareCourses, // For sorting
  selectId: data => data._id
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false,
  product: undefined,
  loadedProduct: false,
  loadingProduct: false,
  error: undefined
});

const productReducer = createReducer(
  initialState,
  on(ProductActions.addProduct, (state, action) => {
    return {
      ...state,
      loading: true,
      error: undefined
    };
  }),
  on(ProductActions.addProductSuccess,
    (state, action) =>
      adapter.addOne(
        action.product,
        { ...state, loading: false, loaded: false }
      ),
  ),
  on(ProductActions.addProductFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    };
  }),
  // Update a Driver
  on(ProductActions.updateProduct, (state, action) => {
    return {
      ...state,
      loading: true,
      error: undefined
    };
  }),
  on(ProductActions.updateProductSuccess,
    (state, action) => {
      return adapter.updateOne(
        {
          id: action.product._id,
          changes: action.product
        },
        { ...state, loading: false, loaded: true }
      );
    }
  ),
  on(ProductActions.updateProductFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    };
  }),
  on(ProductActions.deleteProduct,
    (state, action) => {
      return adapter.removeOne(action.id,
        { ...state, loading: false, loaded: true }
      );
    }
  ),
  // Fetching
  on(ProductActions.loadingProducts, (state, action) => {
    return {
      ...state,
      loading: true,
      error: undefined,
      loaded: false
    };
  }),
  on(ProductActions.loadingProduct, (state, action) => {
    return {
      ...state,
      loadingProduct: true,
      error: undefined,
      loadedProduct: false
    };
  }),
  on(ProductActions.loadProducts,
    (state, action) => adapter.addAll(action.products, { ...state, loading: false, loaded: true })
    // addAll-Replace list & addMany-add to current list
  ),
  on(ProductActions.loadProduct, (state, action) => {
    return {
      ...state,
      loadedProduct: true,
      product: action.product,
      loadingProduct: false
    };
  }),
  on(ProductActions.clearProducts,
    (state, action) => adapter.removeAll({ ...state, loading: false, loaded: false, error: undefined })
  ),
  on(ProductActions.clearProduct, (state, action) => {
    return {
      ...state,
      loadedProduct: false,
      product: undefined,
      loadingProduct: false
    };
  }),
);

// Get all selectors - getEntities, getIds, getAll
export const select = adapter.getSelectors(); // Entitity Adapter Selector

export function reducer(state: State | undefined, action: Action) {
  return productReducer(state, action);
}
