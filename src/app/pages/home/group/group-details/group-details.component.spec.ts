import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {AvatarModule} from 'ngx-avatar';
import {SharedModule} from 'src/app/shared/shared.module'
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {GroupDetailsComponent} from './group-details.component';
import {GeneralComponent} from './general/general.component'
import {NoteComponent} from './notes/notes.component'
import {ParticipantsComponent} from './participants/participants.component'
import {NotesComponent} from '../../dashboard/notes/notes.component'

describe('GroupDetailsComponent', () => {
  let component: GroupDetailsComponent;
  let fixture: ComponentFixture<GroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupDetailsComponent,NotesComponent,GeneralComponent,NoteComponent,ParticipantsComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        SharedModule,
        AvatarModule,
        ReactiveFormsModule
      ]
     
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDetailsComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('can instantiate the GroupDetailsComponent', () => {
    expect(component).not.toBeNull();
  });
});
