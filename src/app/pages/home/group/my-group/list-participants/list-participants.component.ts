import {Component, OnInit, Input} from '@angular/core';
import {ListParticipantsConstants} from './list-participants-constants'
import {HttpService} from '../../../../../shared/services/http.service'
import {User} from '../../../../../shared/models/user'
import {Group} from '../../../../../shared/models/group'

@Component({
  selector: 'app-list-participants',
  templateUrl: './list-participants.component.html',
  styleUrls: ['./list-participants.component.scss']
})

export class ListParticipantsComponent implements OnInit {
  @Input() Group: Group;
  participants: User[] = [];
  maxPart: number = 0;
  additional: string = '';

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.getUserByGroup((this.Group == null ? 0 : this.Group.id));
  }

// dado el id del grupo Obtiene todos los participantes
  getUserByGroup(idGroup: number) {
    this.httpService.get(ListParticipantsConstants.GET_USERS_BY_GROUPS_URI(idGroup)).subscribe(res => {
      if (res['users'].length > 6) {
        for (let i = 0; i < 6; i++) {
          this.participants.push(res[`users`][i])
        }
        this.maxPart = res[`users`].length;
        let aux = this.maxPart - 6;
        this.additional = aux.toString();
      } else {
        this.participants = res[`users`];
      }
    })
  }
}
