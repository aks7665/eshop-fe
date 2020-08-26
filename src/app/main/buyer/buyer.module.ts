import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';
import { DashboardBuyerComponent } from './dashboard-buyer/dashboard-buyer.component';
import { BuyerComponent } from './buyer.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [DashboardBuyerComponent, BuyerComponent],
  imports: [
    CommonModule,
    SharedModule,
    BuyerRoutingModule
  ]
})
export class BuyerModule { }
