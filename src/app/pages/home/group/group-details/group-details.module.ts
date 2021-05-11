import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import {SharedModule} from 'src/app/shared/shared.module';
import {GroupDetailsRountingModule} from './group-details-rounting.module'
import {GroupDetailsComponent} from './group-details.component'
import {DashboardModule} from "../../dashboard/dashboard.module";
@NgModule({
  declarations: [GroupDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    GroupDetailsRountingModule,
    DashboardModule
  ]
})
export class GroupDetailsModule { }
