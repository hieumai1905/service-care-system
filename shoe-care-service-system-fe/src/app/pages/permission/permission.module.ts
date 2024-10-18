import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PermissionsRoutes} from "./permission-routing";
import {PermissionListComponent} from './permission-list/permission-list.component';
import { PermissionAddComponent } from './permission-add/permission-add.component';
import { PermissionEditComponent } from './permission-edit/permission-edit.component';


@NgModule({
  declarations: [
    PermissionAddComponent,
    PermissionEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PermissionsRoutes),
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
    PermissionListComponent
  ]
})
export class PermissionModule {

}
