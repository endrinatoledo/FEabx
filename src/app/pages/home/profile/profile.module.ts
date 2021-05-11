import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabProfileComponent} from './tab-profile/tab-profile.component';
import {TabSettingComponent} from './tab-setting/tab-setting.component';
import {TabChangePasswordComponent} from './tab-change-password/tab-change-password.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {ProfileComponent} from './profile.component'
import {ProfileRoutingModule} from './profile-routing.module'

import {LandingModule} from '../../landing/landing.module';
import {GroupsModule} from "../../../shared/components/groups/groups.module";

@NgModule({
  declarations: [ProfileComponent, TabProfileComponent, TabSettingComponent, TabChangePasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    // AvatarModule,
    // FormsModule,
    // ReactiveFormsModule,
    LandingModule,
    GroupsModule
  ],
  exports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    // AvatarModule,
    // FormsModule,
    // ReactiveFormsModule
  ]
})
export class ProfileModule {
}
