import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductsResolver } from 'src/app/resolvers/products.resolver';
import { ProductResolver } from 'src/app/resolvers/product.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: '',
        component: ProductListComponent,
        resolve: {
          products: ProductsResolver
        }
      },
      {
        path: 'create',
        component: ProductCreateComponent
      },
      {
        path: 'view/:id',
        component: ProductCreateComponent,
        resolve: {
          product: ProductResolver
        }
      },
      {
        path: 'update/:id',
        component: ProductCreateComponent,
        resolve: {
          products: ProductResolver
        }
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
