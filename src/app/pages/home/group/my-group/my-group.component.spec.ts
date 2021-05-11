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
import {MyGroupComponent} from './my-group.component'
import {CardMyGroupComponent} from './card-my-group/card-my-group.component' 
import {ListParticipantsComponent} from './list-participants/list-participants.component'

describe('MyGroupComponent', () => {
  let component: MyGroupComponent;
  let fixture: ComponentFixture<MyGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyGroupComponent,CardMyGroupComponent,ListParticipantsComponent],
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
    fixture = TestBed.createComponent(MyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('can instantiate the MyGroupComponent', () => {
    expect(component).not.toBeNull();
  });
});


