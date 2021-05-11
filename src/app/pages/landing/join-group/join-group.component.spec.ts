import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {JoinGroupComponent} from './join-group.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

describe('JoinGroupComponent', () => {
  let component: JoinGroupComponent;
  let fixture: ComponentFixture<JoinGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JoinGroupComponent],
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
    fixture = TestBed.createComponent(JoinGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create JoinGroupComponent', () => {
    expect(component).toBeTruthy();
  });
  it('can instantiate the JoinGroupComponent', () => {
    expect(component).not.toBeNull();
  });
});
