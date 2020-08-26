import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardBuyerRoutingModule } from './dashboard-buyer-routing.module';
import { ProductsResolver } from 'src/app/resolvers/products.resolver';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardBuyerRoutingModule
  ],
  providers: [
    ProductsResolver
  ]
})
export class DashboardBuyerModule { }
