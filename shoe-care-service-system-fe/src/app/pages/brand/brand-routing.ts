import {Routes} from '@angular/router';
import {BrandAddComponent} from "./brand-add/brand-add.component";
import {BrandEditComponent} from "./brand-edit/brand-edit.component";
import {BrandListComponent} from "./brand-list/brand-list.component";

export const BrandsRoutes: Routes = [
  {path: '', component: BrandListComponent},
  {path: 'add', component: BrandAddComponent},
  {path: 'edit/:id', component: BrandEditComponent}
];
