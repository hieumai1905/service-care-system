import {Routes} from '@angular/router';
import {OrderListComponent} from "./order-list/order-list.component";
import {OrderAddComponent} from "./order-add/order-add.component";
import {OrderCartListComponent} from "./order-cart-list/order-cart-list.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";

export const OrdersRoutes: Routes = [
  {path: '', component: OrderListComponent},
  {path: 'add', component: OrderAddComponent},
  {path: 'carts', component: OrderCartListComponent},
  {path: 'detail/:id', component: OrderDetailComponent},
];
