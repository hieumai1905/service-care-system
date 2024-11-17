import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {RoleListComponent} from "../role/role-list/role-list.component";
import {ServicesRoutes} from "./service-routing";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ServicesRoutes),
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
    RoleListComponent
  ]
})
export class ServiceModule {
}
