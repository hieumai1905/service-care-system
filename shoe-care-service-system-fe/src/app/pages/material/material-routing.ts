import {Routes} from '@angular/router';
import {MaterialListComponent} from "./material-list/material-list.component";
import {MaterialAddComponent} from "./material-add/material-add.component";
import {MaterialEditComponent} from "./material-edit/material-edit.component";

export const MaterialsRoutes: Routes = [
  {path: '', component: MaterialListComponent},
  {path: 'add', component: MaterialAddComponent},
  {path: 'edit/:id', component: MaterialEditComponent}
];
