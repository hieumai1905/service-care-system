import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PermissionListComponent} from "../permission/permission-list/permission-list.component";
import {ClientsRoutes} from "./client-routing";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ClientsRoutes),
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
    PermissionListComponent
  ]
})
export class ClientModule {
}
