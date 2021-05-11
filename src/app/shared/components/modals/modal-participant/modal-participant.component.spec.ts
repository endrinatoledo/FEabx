import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParticipantComponent } from './modal-participant.component';

describe('ModalParticipantComponent', () => {
  let component: ModalParticipantComponent;
  let fixture: ComponentFixture<ModalParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
