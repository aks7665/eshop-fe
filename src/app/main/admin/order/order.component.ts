import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Router } from '@angular/router';
import { fetchAllOrders } from 'src/app/store/orders/orders.selectors';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders$: Observable<Order[]>;

  imgPath = environment.imageUrl + '/products/';

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.orders$ = this.store.pipe(select(fetchAllOrders));
  }

}
