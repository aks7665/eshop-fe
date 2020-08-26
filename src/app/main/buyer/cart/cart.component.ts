import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductCart } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Router } from '@angular/router';
import { fetchCart } from 'src/app/store/cart/cart.selectors';
import { removeFromCart, updateCartItem } from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products$: Observable<ProductCart[]>;

  imgPath = environment.imageUrl + '/products/';

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(fetchCart));
  }

  redirectTo(path): void {
    this.router.navigate(path);
  }

  remove(id: string): void {
    this.store.dispatch(removeFromCart({ id }));
  }

  updateCartItem(productCart: Partial<ProductCart>): void {
    this.store.dispatch(updateCartItem({ product: productCart }));
  }

  onUpdateQty(type: 'inc' | 'desc', productId: string, productQty: number): void {
    if (type === 'desc' && productQty === 1) {
      return;
    }
    const qty = type === 'inc' ? (productQty + 1) : (productQty - 1);
    const product: Partial<ProductCart> = {
      _id: productId,
      quantity: qty
    };
    this.updateCartItem(product);
  }

}
