import {Routes} from '@angular/router';

import {LoginComponent} from '../../pages/login/login.component';
import {NotFoundComponent} from "../../pages/not-found/not-found.component";

export const AuthLayoutRoutes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'not-found', component: NotFoundComponent
  },
];
