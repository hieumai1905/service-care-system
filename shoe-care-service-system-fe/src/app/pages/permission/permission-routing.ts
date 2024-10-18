import {Routes} from '@angular/router';
import {PermissionListComponent} from "./permission-list/permission-list.component";
import {PermissionAddComponent} from "./permission-add/permission-add.component";
import {PermissionEditComponent} from "./permission-edit/permission-edit.component";

export const PermissionsRoutes: Routes = [
  {path: '', component: PermissionListComponent},
  {path: 'add', component: PermissionAddComponent},
  {path: 'edit/:name', component: PermissionEditComponent}
];
