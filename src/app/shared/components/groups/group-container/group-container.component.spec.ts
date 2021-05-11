import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {GroupContainerComponent} from '../group-container/group-container.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {GroupCreateComponent} from '../group-create/group-create.component'
import {ChipsParticipantsComponent} from '../chips-participants/chips-participants.component'
import {ItemGroupComponent} from '../item-group/item-group.component'
import {UpdateImagenComponent} from '../../../../shared/components/update-imagen/update-imagen.component'
describe('GroupContainerComponent', () => {
  let component: GroupContainerComponent;
  let fixture: ComponentFixture<GroupContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupContainerComponent,ChipsParticipantsComponent,GroupCreateComponent,ItemGroupComponent,UpdateImagenComponent],
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
    fixture = TestBed.createComponent(GroupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create GroupContainerComponent', () => {
    expect(component).toBeTruthy();
  });
  it('can instantiate the GroupContainerComponent', () => {
    expect(component).not.toBeNull();
  });
});
