import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from 'src/app/shared/shared.module';
import {HomeComponent} from './home.component';
import {HomeRountingModule} from './home-rounting.module';
import {MenuComponent} from '../../core/components/menu/menu.component';
import {ToolbarComponent} from '../../core/components/toolbar/toolbar.component';
import {MatBadgeModule} from '@angular/material/badge';



@NgModule({
  declarations: [
    MenuComponent,
    ToolbarComponent,
    HomeComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRountingModule,
    MatBadgeModule
  ],
  exports:[
    MenuComponent,
    ToolbarComponent,
    CommonModule,
    SharedModule,
    HomeRountingModule


  ]
})
export class HomeModule {
}
