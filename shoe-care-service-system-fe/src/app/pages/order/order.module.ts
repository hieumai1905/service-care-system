import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {OrdersRoutes} from "./order-routing";
import {OrderCartListComponent} from './order-cart-list/order-cart-list.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';


@NgModule({
  declarations: [
    OrderCartListComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(OrdersRoutes),
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
  ]
})
export class OrderModule {
}
