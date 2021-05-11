import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {RegisterComponent} from './register.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create RegisterComponent', () => {
    expect(component).toBeTruthy();
  });
  it('can instantiate the RegisterComponent', () => {
    expect(component).not.toBeNull();
  });
});
