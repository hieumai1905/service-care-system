import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutRoutes} from './admin-layout-routing';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes)
  ]
})
export class AdminLayoutModule { }
