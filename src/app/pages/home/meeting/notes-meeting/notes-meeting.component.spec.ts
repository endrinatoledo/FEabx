import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesMeetingComponent } from './notes-meeting.component';

describe('NotesMeetingComponent', () => {
  let component: NotesMeetingComponent;
  let fixture: ComponentFixture<NotesMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
