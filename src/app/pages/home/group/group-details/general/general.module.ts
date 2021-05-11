import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GeneralRountingModule} from './general-rounting.module';
import {GeneralComponent} from './general.component'
import {SharedModule} from 'src/app/shared/shared.module';
import {DashboardModule} from "../../../dashboard/dashboard.module";
import {ProgressComponent} from "./progress/progress.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [GeneralComponent,ProgressComponent],
  imports: [
    CommonModule,
    GeneralRountingModule,
    SharedModule,
    DashboardModule,
    FontAwesomeModule
  ]
})
export class GeneralModule { }
