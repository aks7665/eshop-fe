import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AlertService } from '../../shared/alert/alert.service';
import { OrderService } from '../../providers/order.service';
import * as OrderActions from './orders.actions';
import { Router } from '@angular/router';

@Injectable()
export class OrderEffects {

  loadingOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.loadingOrders),
      concatMap((action) =>
        this.orderService.fetchAllOrders().pipe(
          map((response) => {
            if (response.status) {
              return OrderActions.loadOrders({ orders: response.result });
            } else {
              return OrderActions.loadOrders({ orders: [] });
            }
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private orderService: OrderService
  ) {}
}
