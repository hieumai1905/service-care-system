import {Routes} from '@angular/router';
import {SizeListComponent} from "./size-list/size-list.component";
import {SizeAddComponent} from "./size-add/size-add.component";
import {SizeEditComponent} from "./size-edit/size-edit.component";

export const SizesRoutes: Routes = [
  {path: '', component: SizeListComponent},
  {path: 'add', component: SizeAddComponent},
  {path: 'edit/:id', component: SizeEditComponent}
];
