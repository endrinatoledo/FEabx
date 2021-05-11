import {Component, OnInit, Input} from '@angular/core';
import {GroupCreateConstants} from '../../../../../shared/components/groups/group-create/group-create-constants';
import {HttpService} from '../../../../../shared/services/http.service';
import {LandingConstants} from '../../../../landing/landing-constants';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss']
})
export class GroupCardComponent implements OnInit {
  paletteColour = 'primary';
  @Input()
  group: any;
  sub = 'circle';
  msAfiliacion = 'Solicitar Aﬁliación';
  btnStatus = false;

  constructor(private httpService: HttpService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.group[`user`]) {
      if (this.group[`user`][`status`] === 2) {
        this.paletteColour = 'warn';
        this.msAfiliacion = 'Esperando Aceptación';
        this.btnStatus = true;
      }
    }
  }

  reqAfiliation(data) {
    const invitation = {
      status: GroupCreateConstants.GET_INV_STATUS_URI(),
      grpId: data.id,
      usrId: data.lider['usersrolatr.user.id'],
      email: data.lider['usersrolatr.user.email']
    };
    this.httpService.post(GroupCreateConstants.GET_INVITATION_URI(), invitation).subscribe(res => {
      // tslint:disable-next-line:no-shadowed-variable
      this.httpService.get(LandingConstants.GET_USER_BY_ID_URI(this.httpService.userId)).subscribe(res => {
        const configuration = {
          product: LandingConstants.GET_PRODUCT(),
          origin: LandingConstants.GET_ORIGIN(),
          to: data.lider['usersrolatr.user.email'],
          type: LandingConstants.GET_TYPE(),
          actions: LandingConstants.GET_ACTIONS_REQ_AFILIATION(),
          var: [
            {name: 'groupName', value: data.name},
            {name: 'user', value: `${res[`user`][`firstName`]} ${res[`user`][`lastName`]}`},
            {name: 'idUser', value: this.httpService.userId},
            {name: 'grpId', value: invitation.grpId}
          ]
        };
        // tslint:disable-next-line:no-shadowed-variable
        this.httpService.postNotifier(GroupCreateConstants.GET_EMAIL_URI(), configuration).subscribe(res => {
          const membership = {
            rol_id: 2,
            urg_status: 2,
            usr_id: this.httpService.userId,
            grp_id: invitation.grpId
          };
          this.httpService.post(GroupCreateConstants.POST_MEMBERSHIP_REQUEST_URI(), membership).subscribe(res => {
            this.paletteColour = 'warn';
            this.msAfiliacion = 'Esperando Aceptación';
            this.btnStatus = true;
            this.snackBar.open('Se ha enviado la solicitud de afiliación', null, {
              duration: 4000
            });
          }, error => {
            console.log(error);
          });
        }, error => {
          console.log(error);
        });
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

}
