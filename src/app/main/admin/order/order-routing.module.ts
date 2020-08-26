import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrdersResolver } from 'src/app/resolvers/orders.resolver';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    resolve: {
      orders: OrdersResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
