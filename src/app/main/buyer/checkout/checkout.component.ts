import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductCart } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Router } from '@angular/router';
import { fetchCart, isCartLoading } from 'src/app/store/cart/cart.selectors';
import { buyCartItem } from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  loading = false;

  products: ProductCart[] = [];

  imgPath = environment.imageUrl + '/products/';

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(fetchCart)).subscribe(products => {
      this.products = products;
    });
    this.store.pipe(select(isCartLoading)).subscribe(status => this.loading = status );
  }

  redirectTo(path): void {
    this.router.navigate(path);
  }

  buy(products): void {
    this.store.dispatch(buyCartItem({ products: this.products }));
  }

}
