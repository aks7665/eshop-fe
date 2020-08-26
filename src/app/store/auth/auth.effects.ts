import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  tap,
  switchMap,
  takeUntil,
  last,
} from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as AuthActions from './auth.actions';
import * as ProductActions from './../products/products.actions';
import * as CartActions from './../cart/cart.actions';
import * as OrderActions from './../orders/orders.actions';

import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { AlertService } from '../../shared/alert/alert.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      concatMap((action) =>
        this.authService.userLogin(action.data).pipe(
          map((response) => {
            if (response.status) {
              const role = response.user.role;
              // 0 - Admin, 1 - Model, 2 - Studio, 3 - Member
              if (role === 'admin') {
                this.router.navigate(['admin']);
              } else if (role === 'user') {
                this.router.navigate(['buyer']);
              }
              return AuthActions.loginSuccess({ user: response.user });
            } else {
              return AuthActions.loginFailure({
                error: {
                  type: 'Invalid',
                  message: response.message,
                  for: 'login',
                },
              });
            }
          }),
          catchError((error) => EMPTY)
        )
      )
    );
  });

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) =>
          localStorage.setItem('user', JSON.stringify(action.user))
        )
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
        return [
          ProductActions.clearProduct(),
          ProductActions.clearProducts(),
          CartActions.clearCart(),
          OrderActions.clearOrders()
        ];
      })
    )
  );

  registerUser$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(AuthActions.registerUser),
        concatMap(action => this.authService.registerUser(action.user).pipe(
          map(response => {
            if (response.status) {
              this.helperService.showSnackbar('Registered successfully.');
              this.router.navigate(['login']);
              return AuthActions.registerSuccess();
            } else {
              const type = response.error_fields ? response.error_fields[0] : 'Invalid';
              return AuthActions.loginFailure({
                error: {
                  type,
                  message: response.message,
                  for: 'register',
                },
              });
            }
          })
        ))
      )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private helperService: AlertService
  ) {}
}
