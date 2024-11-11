import {Routes} from '@angular/router';
import {CouponEditComponent} from "./coupon-edit/coupon-edit.component";
import {CouponListComponent} from "./coupon-list/coupon-list.component";
import {CouponAddComponent} from "./coupon-add/coupon-add.component";
import {CouponItemListComponent} from "./coupon-item-list/coupon-item-list.component";

export const CouponsRoutes: Routes = [
  {path: '', component: CouponListComponent},
  {path: 'add', component: CouponAddComponent},
  {path: 'edit/:id', component: CouponEditComponent},
  {path: 'items', component: CouponItemListComponent}
];
