import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from '../../../models/user'

@Component({
  selector: 'app-chips-participants',
  templateUrl: './chips-participants.component.html',
  styleUrls: ['./chips-participants.component.scss']
})
export class ChipsParticipantsComponent implements OnInit {
  @Input() user;
  @Input() invitation;
  @Output() part = new EventEmitter<any>();
  @Output() deleteInvitationPart = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {}

  deletePart(user: User) {
    this.part.emit(user)
  }

  deleteInv(user) {
    this.deleteInvitationPart.emit(user)
  }
}
