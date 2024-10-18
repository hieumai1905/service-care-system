import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleListComponent} from './role-list/role-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RolesRoutes} from "./role-routing";
import {MatPaginatorModule} from "@angular/material/paginator";
import { RoleEditComponent } from './role-edit/role-edit.component';

@NgModule({
  declarations: [
    RoleEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RolesRoutes),
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
    RoleListComponent
  ]
})
export class RoleModule {
}
