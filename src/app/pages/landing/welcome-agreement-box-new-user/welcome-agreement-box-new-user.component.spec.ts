import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import { WelcomeAgreementBoxNewUserComponent } from './welcome-agreement-box-new-user.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

describe('WelcomeAgreementBoxNewUserComponent', () => {
  let component: WelcomeAgreementBoxNewUserComponent;
  let fixture: ComponentFixture<WelcomeAgreementBoxNewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeAgreementBoxNewUserComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        AvatarModule,
        BrowserModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeAgreementBoxNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create WelcomeAgreementBoxNewUserComponent', () => {
    expect(component).toBeTruthy();
  });
  it('can instantiate the WelcomeAgreementBoxNewUserComponent', () => {
    expect(component).not.toBeNull();
  });
});
