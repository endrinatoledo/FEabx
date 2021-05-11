import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginComponent} from './login.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create LoginComponent', () => {
    expect(component).toBeTruthy();
 
  });
  it('unit test create loginForm', () => {
    expect(Object.keys(component.loginFormGroup.controls)).toEqual(['email', 'password']);
  });
  it('unit test valid loginForm', () => {
    component.loginFormGroup.get('email').setValue('rortega@intelix.biz');
    component.loginFormGroup.get('password').setValue('rortega@intelix.biz');
    expect(component.loginFormGroup.get('email').value).toBe('rortega@intelix.biz');
    expect(component.loginFormGroup.get('password').value).toBe('rortega@intelix.biz');
  });
  it('can instantiate the LoginComponent', () => {
    expect(component).not.toBeNull();
  });
});
