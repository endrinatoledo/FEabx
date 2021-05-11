import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMeetingComponent } from './modal-meeting.component';

describe('ModalMeetingComponent', () => {
  let component: ModalMeetingComponent;
  let fixture: ComponentFixture<ModalMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
