import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => {
    if (!auth) {
      return false;
    }
    if (auth.user) {
      return true;
    } else {
      return false;
    }
  }
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);

export const isLoadingAuth = createSelector(
  selectAuthState,
  (auth) => auth.loading
);

export const fetchAuthError = createSelector(
  selectAuthState,
  (auth) => auth.error
);

export const selectUser = createSelector(
  selectAuthState,
  (auth) => auth.user
);
