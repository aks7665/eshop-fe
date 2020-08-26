import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardBuyerComponent } from './dashboard-buyer.component';
import { ProductsResolver } from 'src/app/resolvers/products.resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardBuyerComponent,
    resolve: {
      products: ProductsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardBuyerRoutingModule { }
