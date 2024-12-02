import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ReportsRoutes} from "./report-routing";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ReportsRoutes),
  ]
})
export class ReportModule {
}
