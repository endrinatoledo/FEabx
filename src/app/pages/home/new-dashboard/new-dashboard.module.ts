import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import {NewDashboardRoutingModule} from './new-dashboard-routing.module';
// components
import {NewDashboardComponent} from './new-dashboard.component';
import {NotesComponent} from './notes/notes.component';
import {NotificationsComponent} from '../dashboard/notifications/notifications.component';
import {GroupsModule} from '../../../shared/components/groups/groups.module';
import { TableMeetingComponent } from './table-meeting/table-meeting.component';

@NgModule({
  declarations: [
    NotesComponent,
    NewDashboardComponent,
    TableMeetingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NewDashboardRoutingModule,
    GroupsModule,
  ],
  exports:[NotesComponent]
})
export class NewDashboardModule {
}
