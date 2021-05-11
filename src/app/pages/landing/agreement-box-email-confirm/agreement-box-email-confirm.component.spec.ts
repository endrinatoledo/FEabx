import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {AgreementBoxEmailConfirmComponent} from './agreement-box-email-confirm.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

describe('AgreementBoxEmailConfirmComponent', () => {
  let component: AgreementBoxEmailConfirmComponent;
  let fixture: ComponentFixture<AgreementBoxEmailConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementBoxEmailConfirmComponent ],
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
    fixture = TestBed.createComponent(AgreementBoxEmailConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create AgreementBoxEmailConfirmComponent', () => {
    expect(component).toBeTruthy();
  });
  it('can instantiate the AgreementBoxEmailConfirmComponent', () => {
    expect(component).not.toBeNull();
  });
});
