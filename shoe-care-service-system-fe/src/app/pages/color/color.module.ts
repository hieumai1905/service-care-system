import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ColorsRoutes} from "./color-routing";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ColorsRoutes),
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
  ]
})
export class ColorModule {
}
