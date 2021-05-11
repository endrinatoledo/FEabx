import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {UpdateImagenUserComponent } from './update-imagen-user.component';
import {GroupCreateComponent} from '../../../shared/components/groups/group-create/group-create.component'
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {AvatarModule} from 'ngx-avatar';
import {SharedModule} from 'src/app/shared/shared.module'
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {UpdateImagenComponent} from '../../../shared/components/update-imagen/update-imagen.component'
import {ChipsParticipantsComponent} from '../../../shared/components/groups/chips-participants/chips-participants.component'
import {GroupContainerComponent} from '../../../shared/components/groups/group-container/group-container.component'
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {ItemGroupComponent} from '../../../shared/components/groups/item-group/item-group.component'

describe('UpdateImagenUserComponent', () => {
  let component: UpdateImagenUserComponent;
  let fixture: ComponentFixture<UpdateImagenUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateImagenUserComponent,GroupCreateComponent,UpdateImagenComponent,ChipsParticipantsComponent,GroupContainerComponent,ItemGroupComponent],
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
    fixture = TestBed.createComponent(UpdateImagenUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('can instantiate the UpdateImagenUserComponent', () => {
    expect(component).not.toBeNull();
  });
});
