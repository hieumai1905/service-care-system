import {Routes} from '@angular/router';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
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
  },
  {
    path: 'materials',
    children: [
      {path: '', loadChildren: () => import('../../pages/material/material.module').then(m => m.MaterialModule)},
    ]
  },
  {
    path: 'brands',
    children: [
      {path: '', loadChildren: () => import('../../pages/brand/brand.module').then(m => m.BrandModule)},
    ]
  },
  {
    path: 'category-services',
    children: [
      {
        path: '',
        loadChildren: () => import('../../pages/category-service/category-service.module')
          .then(m => m.CategoryServiceModule)
      },
    ]
  },
  {
    path: 'category-products',
    children: [
      {
        path: '',
        loadChildren: () => import('../../pages/category-product/category-product.module')
          .then(m => m.CategoryProductModule)
      },
    ]
  },
  {
    path: 'colors',
    children: [
      {
        path: '',
        loadChildren: () => import('../../pages/color/Color.module').then(m => m.ColorModule)
      },
    ]
  },
  {
    path: 'sizes',
    children: [
      {
        path: '',
        loadChildren: () => import('../../pages/size/Size.module').then(m => m.SizeModule)
      },
    ]
  }
  ,
  {
    path: 'coupons',
    children: [
      {
        path: '',
        loadChildren: () => import('../../pages/coupon/Coupon.module').then(m => m.CouponModule)
      },
    ]
  }
];
