import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../models/user.model';
import { ErrorForm } from '../../models/error-form.model';

export const authFeatureKey = 'auth';

export interface State {
  user: User;
  loading: boolean;
  error: ErrorForm;
}

export const initialState: State = {
  user: undefined,
  loading: false,
  error: undefined
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      loading: true,
      error: undefined
    };
  }),
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      user: action.user,
      error: undefined
    };
  }),
  on(AuthActions.loginFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    };
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      ...state,
      user: undefined,
      error: undefined,
      loading: false,
    };
  }),
  on(AuthActions.registerUser, (state, action) => {
    return {
      ...state,
      loading: true,
      error: undefined
    };
  }),
  on(AuthActions.registerSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      error: undefined
    };
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
