import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MeetingRountingModule} from './meeting-rounting.module'
import {MeetingComponent} from './meeting.component'
import {MeetingInformationComponent} from './meeting-information/meeting-information.component'
import {MeetingAddComponent} from './meeting-add/meeting-add.component'
import {SharedModule} from 'src/app/shared/shared.module';
import {DashboardModule} from '../dashboard/dashboard.module'
import {NotesMeetingComponent} from './notes-meeting/notes-meeting.component'
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [MeetingComponent,MeetingInformationComponent,MeetingAddComponent,NotesMeetingComponent],
  imports: [
    CommonModule,
    MeetingRountingModule,
    SharedModule,
    DashboardModule,
    DragDropModule

  ]
})
export class MeetingModule { }
