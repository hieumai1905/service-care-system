import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrandEditComponent} from './brand-edit/brand-edit.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrandsRoutes} from "./brand-routing";


@NgModule({
  declarations: [
    BrandEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(BrandsRoutes),
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
  ]
})
export class BrandModule {
}
