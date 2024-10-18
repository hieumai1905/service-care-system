import {Routes} from '@angular/router';
import {RoleListComponent} from "./role-list/role-list.component";
import {RoleAddComponent} from "./role-add/role-add.component";
import {RoleEditComponent} from "./role-edit/role-edit.component";

export const RolesRoutes: Routes = [
  {path: '', component: RoleListComponent},
  {path: 'add', component: RoleAddComponent},
  {path: 'edit/:name', component: RoleEditComponent}
];
