import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/models/product.model';
import { fetchAllProducts } from 'src/app/store/products/products.selectors';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { deleteProduct } from 'src/app/store/products/products.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

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

  deleteProduct(id): void {
    this.store.dispatch(deleteProduct({ id }));
  }
}
