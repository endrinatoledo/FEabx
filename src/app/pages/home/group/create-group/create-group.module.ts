import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateGroupRountingModule} from './create-group-rounting.module'
import {CreateGroupComponent} from './create-group.component'
import {SharedModule} from 'src/app/shared/shared.module';
import {GroupsModule} from '../../../../shared/components/groups/groups.module'

@NgModule({
  declarations: [CreateGroupComponent],
  imports: [
    CommonModule,
    CreateGroupRountingModule,
    SharedModule,
    GroupsModule
  ]
})
export class CreateGroupModule { }
