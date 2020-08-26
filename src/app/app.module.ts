import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthEffects } from './store/auth/auth.effects';
import { ProductEffects } from './store/products/products.effects';
import { CartEffects } from './store/cart/cart.effects';
import { OrderEffects } from './store/orders/orders.effects';
import * as fromAuth from './store/auth/auth.reducer';
import * as fromProduct from './store/products/products.reducer';
import * as fromCart from './store/cart/cart.reducer';
import * as fromOrders from './store/orders/orders.reducer';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { BuyerGuard } from './guards/buyer.guard';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([
      AuthEffects,
      ProductEffects,
      CartEffects,
      OrderEffects
    ]),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    StoreModule.forFeature(fromProduct.productFeatureKey, fromProduct.reducer),
    StoreModule.forFeature(fromCart.cartFeatureKey, fromCart.reducer),
    StoreModule.forFeature(fromOrders.orderFeatureKey, fromOrders.reducer),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    AuthGuard,
    AdminGuard,
    BuyerGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
