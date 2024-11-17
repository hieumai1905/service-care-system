import {Routes} from '@angular/router';
import {ShippingProvinceListComponent} from "./shipping-province-list/shipping-province-list.component";
import {ShippingProvinceAddComponent} from "./shipping-province-add/shipping-province-add.component";
import {ShippingProvinceEditComponent} from "./shipping-province-edit/shipping-province-edit.component";

export const ShippingProvincesRoutes: Routes = [
  {path: '', component: ShippingProvinceListComponent},
  {path: 'add', component: ShippingProvinceAddComponent},
  {path: 'edit/:id', component: ShippingProvinceEditComponent}
];
