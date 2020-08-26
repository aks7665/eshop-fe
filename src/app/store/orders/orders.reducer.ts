import { Action, createReducer, on } from '@ngrx/store';
import * as OrderActions from './orders.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Order } from '../../models/order.model';

export const orderFeatureKey = 'order';

// tslint:disable-next-line: no-empty-interface
export interface State { }

export interface State extends EntityState<Order> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  // sortComparer: compareCourses, // For sorting
  selectId: data => data._id
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false
});

const orderReducer = createReducer(
  initialState,
  on(OrderActions.loadingOrders, (state, action) => {
    return {
      ...state,
      loading: true,
      loaded: false
    };
  }),
  on(OrderActions.loadOrders,
    (state, action) => adapter.addAll(action.orders, { ...state, loading: false, loaded: true })
    // addAll-Replace list & addMany-add to current list
  ),
  on(OrderActions.clearOrders,
    (state, action) => adapter.removeAll({ ...state, loading: false, loaded: false })
  ),
);

// Get all selectors - getEntities, getIds, getAll
export const select = adapter.getSelectors(); // Entitity Adapter Selector

export function reducer(state: State | undefined, action: Action) {
  return orderReducer(state, action);
}
