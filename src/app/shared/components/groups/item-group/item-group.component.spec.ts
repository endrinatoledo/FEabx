import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {GroupCreateComponent} from '../group-create/group-create.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ChipsParticipantsComponent} from '../chips-participants/chips-participants.component'
import {UpdateImagenComponent} from '../../update-imagen/update-imagen.component';
import {GroupContainerComponent} from '../group-container/group-container.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import{ItemGroupComponent} from '../item-group/item-group.component'

describe('ItemGroupComponent', () => {
  let component: ItemGroupComponent;
  let fixture: ComponentFixture<ItemGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemGroupComponent,UpdateImagenComponent,GroupContainerComponent,ChipsParticipantsComponent,GroupCreateComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        AvatarModule,
        BrowserModule,
        BrowserAnimationsModule,
        SlickCarouselModule
      ]
     
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGroupComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create ItemGroupComponent', () => {
    expect(component).toBeTruthy();
  });
  it('can instantiate the ItemGroupComponent', () => {
    expect(component).not.toBeNull();
  });
});
