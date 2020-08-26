import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrdersResolver } from 'src/app/resolvers/orders.resolver';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutingModule
  ],
  providers: [
    OrdersResolver
  ]
})
export class OrderModule { }
