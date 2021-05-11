import {Component, Input, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {HttpService} from '../../../../../shared/services/http.service'
import {User} from '../../../../../shared/models/user';
import {ParticipantsConstants} from '../participants/participants-constants';
import {ModalService} from '../../../../../shared/services/modal.service'
import {Usersrolatr} from '../../../../../shared/models/usersrolatr'
import {GroupCreateConstants} from '../../../../../shared/components/groups/group-create/group-create-constants'

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  maxPart: number = 0;
  additional: string = '';
  participants: User[] = new Array()
  inviteds: User[] = new Array()
  users: User[]
  auxParticipants: User[] = new Array()
  usersrolatr: Usersrolatr
  idGroup: number = 0;
  idOrg: number
  nameGroup: string

  constructor(private httpService: HttpService, private snackBar: MatSnackBar, private modalService: ModalService) {
    this.idGroup = this.httpService.selectGroup.id;
    this.idOrg = this.httpService.selectGroup.orgId;
    this.nameGroup = this.httpService.selectGroup.name

  }

  ngOnInit() {
    this.ToParticipants(this.httpService.selectGroup.id);
  }

  ToParticipants(IdGroup) {
    this.httpService.get(ParticipantsConstants.GET_PARTICIPANTS_BY_GROUP(IdGroup)).subscribe(res => {
      this.participants = res['users'];
      this.participants = this.participants.filter((p) => p.id != this.httpService.userId)
    })
  }

  DeletePartList(user: User) {
    this.participants = this.participants.filter((p) => p.id !== user.id);
    this.httpService.delete(ParticipantsConstants.DELETE_PARTICIPANT_GROUP(this.httpService.selectGroup.id, user.id)).subscribe(res => {
      this.ToParticipants(this.httpService.selectGroup.id)
      this.snackBar.open(res[`message`], null, {duration: 10000}).afterOpened()
    }, error => {
      this.snackBar.open(error[`message`], null, {duration: 10000}).afterOpened()
    })
    // this.users.push(user);
    // this.auxParticipants.push(user);
  }

  deleteInvitation(item) {
    this.participants = this.participants.filter((i) => i.email !== item)
  }

  openCreateModalPart() {
    this.modalService.modalParticipant(ParticipantsConstants.GET_TITLE_MODAL_PARTICIPANTS(), {}).subscribe(modal => {
      const emailInvited = modal.formParticipants.invited
      const participant = modal.formParticipants.participant
      if (participant) {
        this.saveParticipant(participant)
      }
      if (emailInvited) {
        this.saveInvited(emailInvited)
      }
    })
  }

  saveParticipant(participant) {
    const usersrolatr = {
      userid: participant.id,
      groupid: this.idGroup,
      rolid: ParticipantsConstants.GET_USER_ROL_ID_PART(),
      urgstatus: ParticipantsConstants.GET_USER_STATUS()
    }

    this.httpService.post(ParticipantsConstants.GET_GROUP_PARTICIPANT(), usersrolatr).subscribe(res => {
      if (res.usrId) {
        this.saveAndSubmitInvitacion(null, this.idGroup, this.httpService.userId, this.nameGroup, participant.email)
        this.ToParticipants(this.idGroup)
        this.snackBar.open('Se ha agregado el Participante', null, {duration: 10000}).afterOpened().subscribe(res => {
        });
      } else {
        this.snackBar.open('No se ha agregado el Participante', null, {duration: 10000}).afterOpened().subscribe(res => {
        });
      }
    })
  }

  saveInvited(invited) {
    this.httpService.get(ParticipantsConstants.GET_CREATE_INVITED_URI(this.idGroup, this.httpService.userId, invited)).subscribe(res => {
      if (res.email) {
        this.saveAndSubmitInvitacion(res.email, this.idGroup, this.httpService.userId, this.nameGroup, null)
        this.ToParticipants(this.idGroup)
        this.snackBar.open('Se ha agregado el Invitado', null, {duration: 10000}).afterOpened().subscribe(res => {
        })
      } else {
        this.snackBar.open('No se ha agregado el Invitado', null, {duration: 10000}).afterOpened().subscribe(res => {
        })
      }
    });
  }

  saveAndSubmitInvitacion(emailInv, groupId, userId, groupName, emailPart) {
    const invitation = {
      status: GroupCreateConstants.GET_INV_STATUS_URI(),
      grpId: groupId,
      usrId: userId,
      email: ""
    }
    const configuration = {
      product: GroupCreateConstants.GET_PRODUCT(),
      origin: GroupCreateConstants.GET_ORIGIN(),
      to: "",
      type: GroupCreateConstants.GET_TYPE(),
      actions: GroupCreateConstants.GET_ACTIONS_INVITATION_USER(),
      var: [
        {
          name: 'leader',
          value: this.httpService.name
        },
        {
          name: 'groupName',
          value: groupName
        }
      ]
    }

    //se envia la invitacion al usuario externo
    if (emailInv) {
      invitation.email = emailInv;
      configuration.to = emailInv;
      this.httpService.post(GroupCreateConstants.GET_INVITATION_URI(), invitation).subscribe(res => {
      })
      this.httpService.postNotifier(GroupCreateConstants.GET_EMAIL_URI(), configuration).subscribe(res => {
      })
    }
    // se le envia la notificacion al usuario que va a participar en el grupo
    if (emailPart) {
      configuration.to = emailPart;
      this.httpService.postNotifier(GroupCreateConstants.GET_EMAIL_URI(), configuration).subscribe(res => {
      })
    }
  }

}
