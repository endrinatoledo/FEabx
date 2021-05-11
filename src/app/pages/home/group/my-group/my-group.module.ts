import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyGroupComponent} from './my-group.component'
import {CardMyGroupComponent} from './card-my-group/card-my-group.component'
import {SharedModule} from 'src/app/shared/shared.module';
import {MyGroupRountingModule} from './my-group-rounting.module'
import {ListParticipantsComponent} from './list-participants/list-participants.component'
@NgModule({
  declarations: [MyGroupComponent,CardMyGroupComponent,ListParticipantsComponent],
  imports: [
    MyGroupRountingModule,
    CommonModule,
    SharedModule
  ]
})
export class MyGroupModule { }
