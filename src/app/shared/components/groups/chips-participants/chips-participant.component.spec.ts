import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {ChipsParticipantsComponent} from './chips-participants.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {GroupCreateComponent} from '../group-create/group-create.component';
import { FormsModule } from '@angular/forms';
import {UpdateImagenComponent} from '../../update-imagen/update-imagen.component';
import {GroupContainerComponent} from '../group-container/group-container.component';
import {SlickCarouselModule } from 'ngx-slick-carousel';
import{ItemGroupComponent} from '../item-group/item-group.component'

describe('ChipsParticipantsComponent', () => {
  let component: ChipsParticipantsComponent;
  let fixture: ComponentFixture<ChipsParticipantsComponent>;

  beforeEach(async(() => {
   
    TestBed.configureTestingModule({
      declarations: [ChipsParticipantsComponent,GroupCreateComponent,UpdateImagenComponent,GroupContainerComponent,ItemGroupComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        AvatarModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        SlickCarouselModule
      ]
     
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsParticipantsComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create ChipsParticipantsComponent', () => {
    expect(component).toBeTruthy();
  });
  it('can instantiate the ChipsParticipantsComponent', () => {
    expect(component).not.toBeNull();
  });
});
