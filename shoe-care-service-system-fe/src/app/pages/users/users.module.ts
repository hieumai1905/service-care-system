import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {UsersRoutes} from "./users-routing";
import {UserAddComponent} from './user-add/user-add.component';
import {RoleListComponent} from "../role/role-list/role-list.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UserAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UsersRoutes),
    ReactiveFormsModule,
    RoleListComponent
  ]
})
export class UsersModule {
}
