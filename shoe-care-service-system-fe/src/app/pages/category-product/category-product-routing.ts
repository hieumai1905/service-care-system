import {Routes} from '@angular/router';
import {CategoryProductListComponent} from "./category-product-list/category-product-list.component";
import {CategoryProductEditComponent} from "./category-product-edit/category-product-edit.component";
import {CategoryProductAddComponent} from "./category-product-add/category-product-add.component";

export const CategoryProductsRoutes: Routes = [
  {path: '', component: CategoryProductListComponent},
  {path: 'add', component: CategoryProductAddComponent},
  {path: 'edit/:id', component: CategoryProductEditComponent}
];
