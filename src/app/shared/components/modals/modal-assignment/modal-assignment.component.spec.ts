import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import {MatDialog, MatDialogRef,MatDialogModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {SharedModule} from '../../../../shared/shared.module';
import {ModalAssignmentComponent} from './modal-assignment.component';
/*
describe('ModalAssignmentComponent', () => {
  let component: ModalAssignmentComponent;
  let fixture: ComponentFixture<ModalAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAssignmentComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        AvatarModule,
        BrowserModule,
        BrowserAnimationsModule,
        SlickCarouselModule,
        MatDialogModule,
        HttpClientTestingModule
      ],providers: [ MatDialogRef,
      MatDialog ],
      
     
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ModalAssignmentComponent', () => {
    expect(component).toBeTruthy();
  });
  it('can instantiate the ModalAssignmentComponent', () => {
    expect(component).not.toBeNull();
  });
});
*/