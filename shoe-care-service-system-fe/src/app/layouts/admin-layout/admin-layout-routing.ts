import {Routes} from '@angular/router';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {ProductsComponent} from "../../pages/products/products.component";

export const AdminLayoutRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'products', component: ProductsComponent},
  {
    path: 'users',
    children: [
      {path: '', loadChildren: () => import('../../pages/users/users.module').then(m => m.UsersModule)},
    ]
  },
  {
    path: 'roles',
    children: [
      {path: '', loadChildren: () => import('../../pages/role/role.module').then(m => m.RoleModule)},
    ]
  },
  {
    path: 'permissions',
    children: [
      {path: '', loadChildren: () => import('../../pages/permission/permission.module').then(m => m.PermissionModule)},
    ]
  }
];
