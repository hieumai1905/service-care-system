import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {UsersRoutes} from "./users-routing";
import { UserAddComponent } from './user-add/user-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UserAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UsersRoutes),
    ReactiveFormsModule
  ]
})
export class UsersModule {
}
