import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AlertService } from '../../shared/alert/alert.service';
import { ProductService } from '../../providers/product.service';
import * as ProductActions from './products.actions';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {

  addProperty$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.addProduct),
      map((action) => {
        const formValue = action.product;
        const fd = new FormData();
        for (const key in action.product) {
          if (action.product.hasOwnProperty(key)) {
            fd.append(key, formValue[key]);
          }
        }
        if (action.hasOwnProperty('image')) {
          const file = action.image;
          fd.append('product_image', file);
        }
        return fd;
      }),
      concatMap(data =>
        this.productService.createProduct(data).pipe(
          map(response => {
            if (response.status) {
              this.router.navigate(['admin', 'products']);
              this.helperService.showSnackbar('Product Created.');
              return ProductActions.addProductSuccess({ product: response.result });
            } else {
              return ProductActions.addProductFailure({
                error: {
                  type: response.error_fields,
                  message: response.message
                }
              });
            }
          }),
          catchError(error => EMPTY)
        )
      )
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      map((action) => {
        const formValue = action.product;
        const fd = new FormData();
        for (const key in action.product) {
          if (action.product.hasOwnProperty(key)) {
            fd.append(key, formValue[key]);
          }
        }
        if (action.hasOwnProperty('image')) {
          const file = action.image;
          fd.append('product_image', file);
        }
        return [fd, action.productId];
      }),
      concatMap(data =>
        this.productService.updateProduct(data[1], data[0]).pipe(
          map(response => {
            if (response.status) {
              this.router.navigate(['admin', 'products']);
              this.helperService.showSnackbar('Product Updated.');
              return ProductActions.addProductSuccess({ product: response.result });
            } else {
              return ProductActions.addProductFailure({
                error: {
                  type: response.error_fields,
                  message: response.message
                }
              });
            }
          }),
          catchError(error => EMPTY)
        )
      )
    );
  });

  deleteProduct$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ProductActions.deleteProduct),
        concatMap(action => this.productService.deleteProduct(action.id).pipe(
          map(response => {
            if (response.status) {
              this.helperService.showSnackbar('Product deleted.');
              return EMPTY;
            } else {
              return EMPTY;
            }
          })
        ))
      ),
    { dispatch: false }
  );

  loadingProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadingProducts),
      concatMap((action) =>
        this.productService.fetchAllProducts().pipe(
          map((response) => {
            if (response.status) {
              return ProductActions.loadProducts({ products: response.result });
            } else {
              return ProductActions.loadProducts({ products: [] });
            }
          })
        )
      )
    );
  });

  loadingProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadingProduct),
      concatMap((action) =>
        this.productService.fetchProduct(action.productId).pipe(
          map((response) => {
            if (response.status) {
              return ProductActions.loadProduct({ product: response.result });
            } else {
              this.router.navigate(['admin', 'products']);
              return ProductActions.loadProduct({ product: undefined });
            }
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private helperService: AlertService,
    private productService: ProductService,
    private router: Router
  ) {}
}
