import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import {LandingModule} from './landing.module'
import {LandingComponent} from './landing.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PasswordRecoveryComponent} from './password-recovery/password-recovery.component';
import { SendEmailComponent } from './send-email/send-email.component';
import {CreateUserComponent} from './create-user/create-user.component'
import {JoinGroupComponent} from './join-group/join-group.component'
import {WelcomeAgreementBoxComponent} from './welcome-agreement-box/welcome-agreement-box.component'
import {WelcomeAgreementBoxNewUserComponent} from './welcome-agreement-box-new-user/welcome-agreement-box-new-user.component';
import {AgreementBoxEmailConfirmComponent} from './agreement-box-email-confirm/agreement-box-email-confirm.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component'
describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('can instantiate the LandingComponent', () => {
    expect(component).not.toBeNull();
  });
});

describe('LandingRouting', () => {

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
          component: ResetPasswordComponent
        }
      ]
    }
  ];

  tests(routes);
});

function tests(routes) {

  it(`LandingRouter exits `, () => {
    expect(routes).not.toBeNull();
  });

  it(`LandingRouter is 9 `, () => {
    expect(routes[0].children.length).toEqual(9);
  });

  it(`LoginComponent Copmponent exists in LandingRouter`, () => {
    expect(routes[0].children[1]).not.toBeNull();
  });

  it(`from LandingCopmponent to LoginComponent `, () => {
    expect(routes[0].children[1].loadChildren).not.toBeNull();
  });

  it(`Link to  LoginComponent exit`, () => {
    expect(routes[0].children[1].path).toEqual('login');
  });

  it(`RegisterComponent exists in LandingRouter`, () => {
    expect(routes[0].children[2]).not.toBeNull();
  });

  it(`from LandingCopmponent to RegisterComponent `, () => {
    expect(routes[0].children[2].loadChildren).not.toBeNull();
  });

  it(`Link to RegisterComponent exit`, () => {
    expect(routes[0].children[2].path).toEqual('register');
  });

  it(`PasswordRecoveryComponent exists in LandingRouter`, () => {
    expect(routes[0].children[3]).not.toBeNull();
  });

  it(`from LandingCopmponent to PasswordRecoveryComponent `, () => {
    expect(routes[0].children[3].loadChildren).not.toBeNull();
  });

  it(`Link to  PasswordRecoveryComponent exit`, () => {
    expect(routes[0].children[3].path).toEqual('password');
  });

  it(`SendEmailComponent exists in LandingRouter`, () => {
    expect(routes[0].children[4]).not.toBeNull();
  });

  it(`from SendEmailComponent to PasswordRecoveryComponent `, () => {
    expect(routes[0].children[4].loadChildren).not.toBeNull();
  });

  it(`Link to  SendEmailComponent exit`, () => {
    expect(routes[0].children[4].path).toEqual('SendEmail');
  });

  it(`CreateUserComponent exists in LandingRouter`, () => {
    expect(routes[0].children[5]).not.toBeNull();
  });

  it(`from CreateUserComponent to PasswordRecoveryComponent `, () => {
    expect(routes[0].children[5].loadChildren).not.toBeNull();
  });

  it(`Link to  CreateUserComponent exit`, () => {
    expect(routes[0].children[5].path).toEqual('create-user');
  });

  it(`JoinGroupComponent exists in LandingRouter`, () => {
    expect(routes[0].children[6]).not.toBeNull();
  });

  it(`from JoinGroupComponent to PasswordRecoveryComponent `, () => {
    expect(routes[0].children[6].loadChildren).not.toBeNull();
  });

  it(`Link to  JoinGroupComponent exit`, () => {
    expect(routes[0].children[6].path).toEqual('join-group');
  });

  it(`WelcomeAgreementBoxComponent exists in LandingRouter`, () => {
    expect(routes[0].children[7]).not.toBeNull();
  });

  it(`from WelcomeAgreementBoxComponent to PasswordRecoveryComponent `, () => {
    expect(routes[0].children[7].loadChildren).not.toBeNull();
  });

  it(`Link to WelcomeAgreementBoxComponent exit`, () => {
    expect(routes[0].children[7].path).toEqual('welcome-agreement-box');
  });

  it(`ResetPasswordComponent exists in LandingRouter`, () => {
    expect(routes[0].children[8]).not.toBeNull();
  });

  it(`from ResetPasswordComponent to PasswordRecoveryComponent `, () => {
    expect(routes[0].children[8].loadChildren).not.toBeNull();
  });

  it(`Link to ResetPasswordComponent exit`, () => {
    expect(routes[0].children[8].path).toEqual('reset-password');
  });



/*
/*
  it(`dashboardCopmponent exists in LandingRouter`, () => {
    expect(routes[0].children[2]).not.toBeNull();
  });

  it(`from dashboardCopmponent to Group Copmponent `, () => {
    expect(routes[0].children[2].loadChildren).not.toBeNull();
  });
  it(`Link to dashboard exit`, () => {
    expect(routes[0].children[2].path).toEqual('dashboard');
  });

  it(`GroupCopmponent exists in LandingRouter`, () => {
    expect(routes[0].children[3]).not.toBeNull();
  });

  it(`from dashboardCopmponent to Group Copmponent `, () => {
    expect(routes[0].children[3].loadChildren).not.toBeNull();
  });
  it(`Link to Group exit`, () => {
    expect(routes[0].children[3].path).toEqual('group');
  });

  it(`profileCopmponent exists in LandingRouter`, () => {
    expect(routes[0].children[4]).not.toBeNull();
  });

  it(`from profileCopmponent to Group Copmponent `, () => {
    expect(routes[0].children[4].loadChildren).not.toBeNull();
  });
  it(`Link to profile exit`, () => {
    expect(routes[0].children[4].path).toEqual('profile');
  });

*/

}

