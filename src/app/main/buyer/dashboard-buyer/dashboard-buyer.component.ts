import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductCart } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { AppState } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { fetchAllProducts } from 'src/app/store/products/products.selectors';
import { addToCart } from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'app-dashboard-buyer',
  templateUrl: './dashboard-buyer.component.html',
  styleUrls: ['./dashboard-buyer.component.css']
})
export class DashboardBuyerComponent implements OnInit {

  products$: Observable<Product[]>;

  imgPath = environment.imageUrl + '/products/';

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(fetchAllProducts));
  }

  redirectTo(path): void {
    this.router.navigate(path);
  }

  onAddToCart(product: Product): void {
    const productCart: ProductCart = {
      ...product,
      quantity: 1
    };
    this.store.dispatch(addToCart({ product: productCart }));
  }

}
