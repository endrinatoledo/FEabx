import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {LandingRoutingModule} from './landing-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PasswordRecoveryComponent} from './password-recovery/password-recovery.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { JoinGroupComponent } from './join-group/join-group.component';
import { WelcomeAgreementBoxComponent } from './welcome-agreement-box/welcome-agreement-box.component'
import {UpdateImagenUserComponent} from '../../shared/components/update-imagen-user/update-imagen-user.component';
import { WelcomeAgreementBoxNewUserComponent } from './welcome-agreement-box-new-user/welcome-agreement-box-new-user.component';
import {AgreementBoxEmailConfirmComponent} from './agreement-box-email-confirm/agreement-box-email-confirm.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LandingComponent} from './landing.component'

@NgModule({
  declarations: [LandingComponent,UpdateImagenUserComponent, LoginComponent, RegisterComponent, PasswordRecoveryComponent, SendEmailComponent, CreateUserComponent, JoinGroupComponent, WelcomeAgreementBoxComponent,WelcomeAgreementBoxNewUserComponent,AgreementBoxEmailConfirmComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    LandingRoutingModule,

  ],
    exports: [
        CommonModule,
        SharedModule,
        LandingRoutingModule,
        UpdateImagenUserComponent,


    ]
})
export class LandingModule {
}
