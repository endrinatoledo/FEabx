import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GroupRountingModule} from './group-rounting.module'
import {SharedModule} from 'src/app/shared/shared.module';

import {GroupComponent} from  './group.component'


@NgModule({
  declarations: [GroupComponent],
  imports: [
    CommonModule,
    GroupRountingModule,
    SharedModule,
  ]
})
export class GroupModule { }
