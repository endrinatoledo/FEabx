import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotesRountingModule} from './notes-rounting.module'
import {NoteComponent} from './notes.component'
import {SharedModule} from 'src/app/shared/shared.module';
import {DashboardModule} from '../../../dashboard/dashboard.module'
@NgModule({
  declarations: [NoteComponent],
  imports: [
    CommonModule,
    NotesRountingModule,
    SharedModule,
    DashboardModule
  ]
})
export class NotesModule { }
