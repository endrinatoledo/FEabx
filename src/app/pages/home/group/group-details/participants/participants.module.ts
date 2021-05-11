import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ParticipantsRountingModule} from './participants-rounting.module'
import {ParticipantsComponent} from './participants.component'
import {SharedModule} from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ParticipantsComponent],
  imports: [
    CommonModule,
    ParticipantsRountingModule,
    SharedModule
  ]
})
export class ParticipantsModule { }
