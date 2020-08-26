import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AlertService } from '../../shared/alert/alert.service';
import { ProductService } from '../../providers/product.service';
import { OrderService } from '../../providers/order.service';
import * as CartActions from './cart.actions';
import { Router } from '@angular/router';

@Injectable()
export class CartEffects {

  buyCartItem$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(CartActions.buyCartItem),
        map((action) => {
          const products = [];
          for (const item of action.products) {
            const ele = {
              product: item._id,
              quantity: item.quantity
            };
            products.push(ele);
          }
          return {
            products
          };
        }),
        concatMap(data => this.orderService.createOrder(data).pipe(
          map(response => {
            if (response.status) {
              this.helperService.showSnackbar('Order placed.');
              return CartActions.clearCart();
            }
          })
        ))
      )
  );

  addToCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.addToCart),
        tap((action) =>
          this.helperService.showSnackbar('Item added to cart.')
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private helperService: AlertService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {}
}
