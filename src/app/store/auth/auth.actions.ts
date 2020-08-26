import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';
import { ErrorForm } from '../../models/error-form.model';

export const login = createAction(
  '[Auth] Login',
  props<{ data: Partial<User> }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: ErrorForm }>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const registerUser = createAction(
  '[Auth] Register New User',
  props<{ user: Partial<User>, image?: File }>()
);

export const registerSuccess = createAction(
  '[Auth] Register New User Success'
);

