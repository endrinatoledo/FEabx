import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMeetingComponent } from './table-meeting.component';

describe('TableMeetingComponent', () => {
  let component: TableMeetingComponent;
  let fixture: ComponentFixture<TableMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
