import {Routes} from '@angular/router';
import {ClientCategoryListComponent} from "./client-category-list/client-category-list.component";
import {ClientCategoryEditComponent} from "./client-category-edit/client-category-edit.component";
import {ClientCategoryAddComponent} from "./client-category-add/client-category-add.component";

export const ClientCategoriesRoutes: Routes = [
  {path: '', component: ClientCategoryListComponent},
  {path: 'add', component: ClientCategoryAddComponent},
  {path: 'edit/:id', component: ClientCategoryEditComponent}
];
