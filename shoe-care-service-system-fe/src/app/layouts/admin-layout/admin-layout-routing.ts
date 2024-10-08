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
  }
];
