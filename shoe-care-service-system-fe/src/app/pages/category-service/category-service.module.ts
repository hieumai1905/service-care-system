import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PermissionListComponent} from "../permission/permission-list/permission-list.component";
import {CategoryServicesRoutes} from "./category-service-routing";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(CategoryServicesRoutes),
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
    PermissionListComponent
  ]
})
export class CategoryServiceModule {
}
