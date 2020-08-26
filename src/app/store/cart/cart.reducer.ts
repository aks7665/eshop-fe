import { Action, createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ProductCart } from '../../models/product.model';

export const cartFeatureKey = 'cart';

// tslint:disable-next-line: no-empty-interface
export interface State {
}

export interface State extends EntityState<ProductCart> {
  loading: boolean;
}

export const adapter: EntityAdapter<ProductCart> = createEntityAdapter<ProductCart>({
  // sortComparer: compareCourses, // For sorting
  selectId: data => data._id
});

export const initialState: State = adapter.getInitialState({
  loading: false
});

const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart,
    (state, action) => {
      const ids: any[] = state.ids;
      if (!ids.includes(action.product._id)) {
        return adapter.addOne(
          action.product,
          { ...state }
        );
      } else {
        const item = state.entities[action.product._id];
        const qty = item.quantity;
        return adapter.updateOne(
          {
            id: action.product._id,
            changes: {
              ...item,
              quantity: qty + 1
            }
          },
          { ...state }
        );
      }
    }
  ),
  on(CartActions.updateCartItem,
    (state, action) => {
      return adapter.updateOne(
        {
          id: action.product._id,
          changes: action.product
        },
        { ...state }
      );
    }
  ),
  on(CartActions.removeFromCart,
    (state, action) => {
      return adapter.removeOne(action.id,
        { ...state, loading: false, loaded: true }
      );
    }
  ),
  on(CartActions.buyCartItem, (state, action) => {
    return {
      ...state,
      loading: true
    };
  }),
  on(CartActions.clearCart,
    (state, action) => adapter.removeAll({ ...state, loading: false })
  )
);

// Get all selectors - getEntities, getIds, getAll
export const select = adapter.getSelectors(); // Entitity Adapter Selector

export function reducer(state: State | undefined, action: Action) {
  return cartReducer(state, action);
}
