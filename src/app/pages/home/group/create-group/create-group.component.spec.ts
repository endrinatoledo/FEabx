
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA } from '@angular/core';
import {CreateGroupComponent } from './create-group.component';
import {GroupCreateComponent} from '../../../../shared/components/groups/group-create/group-create.component'
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {AvatarModule} from 'ngx-avatar';
import {SharedModule} from 'src/app/shared/shared.module'
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {UpdateImagenComponent} from '../../../../shared/components/update-imagen/update-imagen.component'
import {ChipsParticipantsComponent} from '../../../../shared/components/groups/chips-participants/chips-participants.component'
import {GroupContainerComponent} from '../../../../shared/components/groups/group-container/group-container.component'

describe('CreateGroupComponent', () => {
  let component: CreateGroupComponent;
  let fixture: ComponentFixture<CreateGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGroupComponent,GroupCreateComponent,GroupContainerComponent,UpdateImagenComponent,ChipsParticipantsComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        SharedModule,
        AvatarModule,
        ReactiveFormsModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
     
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.getGroupsByUser(1);
    expect(component).toBeTruthy();
  });
  it(' test unit get group by group', () => {
    component.updateGroups();
    component.getGroupsByUser(1);
    console.log(component.groups)
    expect(component.groups).not.toBeNull();
  });
  it('can instantiate the CreateGroupComponent', () => {
    expect(component).not.toBeNull();
  });
});
