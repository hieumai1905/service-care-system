import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthLayoutRoutes} from './auth-layout-routing';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes)
  ]
})
export class AuthLayoutModule {
}
