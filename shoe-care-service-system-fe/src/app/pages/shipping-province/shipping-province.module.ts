import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ShippingProvincesRoutes} from "./shipping-province-routing";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ShippingProvincesRoutes),
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
  ]
})
export class ShippingProvinceModule {
}
