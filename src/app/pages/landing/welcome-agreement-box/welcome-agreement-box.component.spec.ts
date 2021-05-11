import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {WelcomeAgreementBoxComponent} from './welcome-agreement-box.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

describe('WelcomeAgreementBoxComponent', () => {
  let component: WelcomeAgreementBoxComponent;
  let fixture: ComponentFixture<WelcomeAgreementBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeAgreementBoxComponent],
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
    fixture = TestBed.createComponent(WelcomeAgreementBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create WelcomeAgreementBoxComponent', () => {
    expect(component).toBeTruthy();
  });
  it('can instantiate the WelcomeAgreementBoxComponent', () => {
    expect(component).not.toBeNull();
  });
});
