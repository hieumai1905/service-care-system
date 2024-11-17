import {Routes} from '@angular/router';
import {ServiceListComponent} from "./service-list/service-list.component";
import {ServiceAddComponent} from "./service-add/service-add.component";
import {ServiceEditComponent} from "./service-edit/service-edit.component";

export const ServicesRoutes: Routes = [
  {path: '', component: ServiceListComponent},
  {path: 'add', component: ServiceAddComponent},
  {path: 'edit/:id', component: ServiceEditComponent}
];
