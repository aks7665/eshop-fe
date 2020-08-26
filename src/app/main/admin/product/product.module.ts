import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductResolver } from 'src/app/resolvers/product.resolver';
import { ProductsResolver } from 'src/app/resolvers/products.resolver';


@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductCreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ],
  providers: [
    ProductResolver,
    ProductsResolver
  ]
})
export class ProductModule { }
