import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PasswordRecoveryComponent} from './password-recovery/password-recovery.component';
import {LandingComponent} from './landing.component';
import { SendEmailComponent } from './send-email/send-email.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {JoinGroupComponent} from './join-group/join-group.component';
import {WelcomeAgreementBoxComponent} from './welcome-agreement-box/welcome-agreement-box.component';
import {WelcomeAgreementBoxNewUserComponent} from './welcome-agreement-box-new-user/welcome-agreement-box-new-user.component';
import {AgreementBoxEmailConfirmComponent} from './agreement-box-email-confirm/agreement-box-email-confirm.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {CanActivateByAuthGuardService} from "../../core/utils/can-activate-by-auth-guard.service";

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'password',
        component: PasswordRecoveryComponent
      }
      ,
      {
        path: 'SendEmail',
        component: SendEmailComponent
      },
      {
        path: 'create-user',
        component: CreateUserComponent
      },
      {
        path: 'join-group',
        component: JoinGroupComponent
      },
      {
        path: 'welcome-agreement-box',
        component: WelcomeAgreementBoxComponent
      },
      {
        path: 'welcome-agreement-box-new-user',
        component: WelcomeAgreementBoxNewUserComponent

      },
      {
        path: 'agreement-box-email-confirm',
        component: AgreementBoxEmailConfirmComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        canActivate: [CanActivateByAuthGuardService]

      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {
}
