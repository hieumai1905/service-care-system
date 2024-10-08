import {Routes} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {UserAddComponent} from "./user-add/user-add.component";

export const UsersRoutes: Routes = [
  {path: '', component: UserListComponent},
  {path: 'edit/:id', component: UserEditComponent},
  {path: 'add', component: UserAddComponent}
];
