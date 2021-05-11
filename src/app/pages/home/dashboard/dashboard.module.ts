import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import {DashboardRoutingModule} from './dashboard-routing.module';
// components
import {DashboardComponent} from './dashboard.component';
import {NotesComponent} from './notes/notes.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {GroupsModule} from '../../../shared/components/groups/groups.module';

@NgModule({
  declarations: [
    NotesComponent,
    DashboardComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    GroupsModule,
  ],
  exports: [NotesComponent, NotificationsComponent]
})
export class DashboardModule {
}
