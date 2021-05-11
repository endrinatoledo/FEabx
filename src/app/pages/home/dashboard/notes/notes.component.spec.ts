import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {SlickCarouselModule } from 'ngx-slick-carousel';
import {AvatarModule} from 'ngx-avatar';
import {SharedModule} from 'src/app/shared/shared.module'
import {DashboardComponent} from '../dashboard.component'
import {NotesComponent} from './notes.component'
import{GroupContainerComponent} from '../../../../shared/components/groups/group-container/group-container.component'
import {NotificationsComponent} from '../notifications/notifications.component'
import {ItemGroupComponent} from '../../../../shared/components/groups/item-group/item-group.component'


describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent,NotesComponent,GroupContainerComponent,NotificationsComponent,ItemGroupComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        SharedModule,
        AvatarModule,
        ReactiveFormsModule,
        SlickCarouselModule
      ]
     
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('can instantiate the NotesComponent', () => {
    expect(component).not.toBeNull();
  });
});



