import {Routes} from '@angular/router';
import {CategoryServiceListComponent} from "./category-service-list/category-service-list.component";
import {CategoryServiceAddComponent} from "./category-service-add/category-service-add.component";
import {CategoryServiceEditComponent} from "./category-service-edit/category-service-edit.component";

export const CategoryServicesRoutes: Routes = [
  {path: '', component: CategoryServiceListComponent},
  {path: 'add', component: CategoryServiceAddComponent},
  {path: 'edit/:id', component: CategoryServiceEditComponent}
];
