import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PermissionListComponent} from "../permission/permission-list/permission-list.component";
import {ClientCategoriesRoutes} from "./client-category-routing";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ClientCategoriesRoutes),
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
    PermissionListComponent
  ]
})
export class ClientCategoryModule {
}
