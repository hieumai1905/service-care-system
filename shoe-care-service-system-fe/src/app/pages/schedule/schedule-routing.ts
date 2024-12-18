import {Routes} from "@angular/router";
import {ScheduleAddComponent} from "./schedule-add/schedule-add.component";
import {ScheduleListComponent} from "./schedule-list/schedule-list.component";
import {ScheduleDetailComponent} from "./schedule-detail/schedule-detail.component";

export const SchedulesRoutes: Routes = [
  {path: '', component: ScheduleListComponent},
  {path: 'add', component: ScheduleAddComponent},
  {path: 'detail/:id', component: ScheduleDetailComponent}
];
