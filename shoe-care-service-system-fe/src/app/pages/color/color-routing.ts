import {Routes} from '@angular/router';
import {ColorListComponent} from "./color-list/color-list.component";
import {ColorAddComponent} from "./color-add/color-add.component";
import {ColorEditComponent} from "./color-edit/color-edit.component";

export const ColorsRoutes: Routes = [
  {path: '', component: ColorListComponent},
  {path: 'add', component: ColorAddComponent},
  {path: 'edit/:id', component: ColorEditComponent}
];
