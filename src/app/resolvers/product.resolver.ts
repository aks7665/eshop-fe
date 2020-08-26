import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { AppState } from '../store';
import { isProductLoaded } from '../store/products/products.selectors';
import { loadingProduct } from '../store/products/products.actions';

@Injectable()
export class ProductResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store<AppState>) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const productId = route.paramMap.get('id');
    return this.store
      .pipe(
        select(isProductLoaded),
        tap((loaded) => {
          if (!this.loading && !loaded) {
            this.loading = true;
            this.store.dispatch(loadingProduct({ productId }));
          }
        }),
        filter(loaded => loaded),
        first(), // Wait for first observable to get values or error
        finalize(() => this.loading = false) // Runs in last
      );
  }
}
