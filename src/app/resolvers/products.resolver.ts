import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { AppState } from '../store';
import { isProductsLoaded } from '../store/products/products.selectors';
import { loadingProducts } from '../store/products/products.actions';

@Injectable()
export class ProductsResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store<AppState>) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(isProductsLoaded),
        tap((loaded) => {
          if (!this.loading && !loaded) {
            this.loading = true;
            this.store.dispatch(loadingProducts());
          }
        }),
        filter(loaded => loaded),
        first(), // Wait for first observable to get values or error
        finalize(() => this.loading = false) // Runs in last
      );
  }
}
