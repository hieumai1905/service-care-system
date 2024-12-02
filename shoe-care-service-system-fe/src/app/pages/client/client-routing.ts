import {Routes} from '@angular/router';
import {ClientAddComponent} from "./client-add/client-add.component";
import {ClientEditComponent} from "./client-edit/client-edit.component";
import {ClientListComponent} from "./client-list/client-list.component";
import {ClientReportComponent} from "./client-report/client-report.component";

export const ClientsRoutes: Routes = [
    {path: '', component: ClientListComponent},
    {path: 'add', component: ClientAddComponent},
    {path: 'edit/:id', component: ClientEditComponent},
    {path: 'report/:id', component: ClientReportComponent}
];
