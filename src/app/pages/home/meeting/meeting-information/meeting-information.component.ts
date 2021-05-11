import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {HttpService} from '../../../../shared/services/http.service';
import {MeetingInformacionConstants} from './meeting-constants';
import {Meeting} from 'src/app/shared/models/meeting';
import {Assignment} from "../../../../shared/models/assignment";
import {MeetingAddConstants} from "../meeting-add/meeting-add-constants";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-meeting-information',
  templateUrl: './meeting-information.component.html',
  styleUrls: ['./meeting-information.component.scss']
})
export class MeetingInformationComponent implements OnInit {
  @Input() meeting: Meeting;
  @Input() participants: [];
  participantes: [];
  formCreateGroup: FormGroup = new FormGroup({
    grpName: new FormControl(null, [Validators.required]),
    grpDescription: new FormControl(null, [Validators.required]),
    grpSelectGrupo: new FormControl(null, [Validators.required]),
    date: new FormControl(),
    invitation: new FormControl(null, [Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]),
  });

  buttonPrecloserAvailable: boolean;
  buttoncloserAvailable: boolean;
  idMeeting: number;
  allParticipants = [] = [];
  idUser: number;

  // meeting : Meeting;
  constructor(private httpService: HttpService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    console.log(this.meeting.id + 'idddd')
    this.getParticipants(this.meeting.id)
    this.idMeeting = 1
    console.log(this.meeting.status + 'estatuuus')
    switch (Number(this.meeting.status)) {
      case 1: {
        this.buttonPrecloserAvailable = false;
        this.buttoncloserAvailable = true;
        break;
      }
      case 2: {
        this.buttonPrecloserAvailable = true;
        this.buttoncloserAvailable = false;
        break;
      }
      case 3: {
        this.buttonPrecloserAvailable = true;
        this.buttoncloserAvailable = true;
        break;
      }
      case 4: {
        this.buttonPrecloserAvailable = true;
        break;
      }
    }
  }

  getParticipants(idMee: number) {
    this.httpService.get(MeetingInformacionConstants.GET_ALL_PARTICIAPNT_BY_MEETING(idMee)).subscribe(res => {
      let participants: any[] = res['participants']
      for (var k in participants) {
        if (participants[k].userId !== null) {
          this.idUser = participants[k].userId
          this.httpService.get(MeetingInformacionConstants.GET_USER_BY_ID(this.idUser)).subscribe(res => {
            if (res.user.firstName != ' ' || res.user.lastName != ' ') {
              this.allParticipants.unshift(res.user)
            } else {
              this.allParticipants.unshift(res.user.email)
            }
          })
        } else {
          this.allParticipants.unshift(participants[k].userEmail)
        }
      }
    })
  }

  precloseMeeting(meeting: Meeting) {
    this.httpService.get(MeetingInformacionConstants.GET_MEETING_BY_ID(this.meeting.id)).subscribe(res => {
      let meet = res['meeting'];
      if (Number(res['meeting'].status) === 1) {
        console.log(this.httpService.userId)
        console.log(meet.usrId)
        if (meet.usrId != this.httpService.userId) {
          this.snackBar.open(`No posee el rol para cerrar la reunión`, null, {
            duration: 4000
          });
        } else {
          this.httpService.put(MeetingInformacionConstants.GET_STATUS_BY_MEETING_PRECLOSER_URI(this.meeting.id), meeting).subscribe(res => {
            //this.httpService.get(MeetingInformacionConstants.GET_STATUS_BY_MEETING_CLOSER_URI(this.httpService.meetingId, this.httpService.userId)).subscribe(res => {
            this.snackBar.open(`Se ha Precerrado la reunión ${meet.title}`, null, {
              duration: 4000
            });
            this.buttonPrecloserAvailable = true
            this.buttoncloserAvailable = false;
          })
        }
      } else {
        this.snackBar.open(`La reunion no cuenta con el estatus para ser precerrada`, null, {
          duration: 4000
        });
      }
    });
  }

  closeMeeting(meeting: Meeting) {
    let assignments
    let meet
    let users
    let agreements

    this.httpService.get(MeetingInformacionConstants.GET_MEETING_BY_ID(this.meeting.id)).subscribe(res => {
      let meeting = res['meeting'];
      if (meeting.status === 2) {
        if (Number(meeting.usrId) === Number(this.httpService.userId)) {

        } else {
          this.snackBar.open(`No posee el rol para cerrar la reunión`, null, {
            duration: 4000
          });
        }
      } else {
        this.snackBar.open(`La reunion no cuenta con el estatus para ser cerrada`, null, {
          duration: 4000
        });
      }
    }, error => {
      console.log(error)
      this.snackBar.open(`Ha ocurrido un error`, null, {
        duration: 4000
      });
    })
    this.httpService.get(MeetingInformacionConstants.GET_MEETING_BY_ID(this.meeting.id)).subscribe(res => {
      console.log(res['meeting'].status)
      if (res['meeting'].status != 3) {
        this.snackBar.open(`La reunion no cuenta con el estatus para ser cerrada`, null, {
          duration: 4000
        });
      } else {
        meet = res['meeting']
        if (meet.usrId != this.httpService.userId) {
          this.snackBar.open(`No posee el rol para cerrar la reunión`, null, {
            duration: 4000
          });
        } else {
          //envio de asignaciones por correo
          // this.httpService.get(MeetingInformacionConstants.GET_ASSIGNMENT_BY_MEETING_URI(this.meeting.id)).subscribe(res => {
          //
          //   if (res['assignments']) {
          //     assignments = res['assignments']
          //     assignments.forEach(element => {
          //       let email =element.user.email
          //       const con={
          //         product:MeetingInformacionConstants.GET_PRODUCT(),
          //         origin: MeetingInformacionConstants.GET_ORIGIN(),
          //         to: email,
          //         type:MeetingInformacionConstants.GET_TYPE(),
          //         actions:MeetingInformacionConstants.GET_ACTIONS_ASSIGNMENTS_MEETING(),
          //         var:[
          //           {
          //             name:'assignments',
          //             value:res['assignments']
          //           }
          //         ]
          //       }
          //       this.httpService.postNotifier(MeetingInformacionConstants.GET_EMAIL_MEETING_ASSIG_URI(),con).subscribe(res=>{
          //
          //       })
          //     })
          //   }
          // })

          // this.httpService.get(MeetingInformacionConstants.GET_ASSIGNMENT_BY_MEETING_URI(this.idMeeting)).subscribe(res => {
          //   if (res['assignments']) {
          //     assignments = res['assignments']
          //     assignments.forEach(element => {
          //       let email =element.user.email
          //       const con={
          //         product:MeetingInformacionConstants.GET_PRODUCT(),
          //         origin: MeetingInformacionConstants.GET_ORIGIN(),
          //         to: email,
          //         type:MeetingInformacionConstants.GET_TYPE(),
          //         actions:MeetingInformacionConstants.GET_ACTIONS_ASSIGNMENTS_MEETING(),
          //         var:[
          //           {
          //             name:'assignments',
          //             value:res['assignments']
          //           }
          //         ]
          //       }
          //       this.httpService.postNotifier(MeetingInformacionConstants.GET_EMAIL_MEETING_ASSIG_URI(),con).subscribe(res=>{
          //
          //       })
          //     })
          //   } else {
          //   }
          // })
          // if(agreements != null || assignments  != null ){
          //
          //   this.httpService.get(MeetingInformacionConstants.GET_USERS_BY_GROUPS_URI(meet.grpId)).subscribe(res => {
          //     if (res['users']) {
          //       users = res['users']
          //
          //       users.forEach(element => {
          //         let email =element.email
          //
          //         const con={
          //           product:MeetingInformacionConstants.GET_PRODUCT(),
          //           origin: MeetingInformacionConstants.GET_ORIGIN(),
          //           to: email,
          //           type:MeetingInformacionConstants.GET_TYPE(),
          //           actions:MeetingInformacionConstants.GET_ACTIONS_MEETING_MINUTES(),
          //           var:[
          //             {
          //               listAgr: agreements,
          //               listAss: assignments
          //             }
          //           ]
          //         }
          //         this.httpService.postNotifier(MeetingInformacionConstants.GET_EMAIL_MEETING_MINUTES_URI(),con).subscribe(res=>{
          //         })
          //       })
          //     }
          //   })
          // }

          //   this.httpService.put(MeetingInformacionConstants.GET_STATUS_BY_MEETING_CLOSER_URI(this.meeting.id, this.httpService.userId),meeting).subscribe(res => {
          //     this.snackBar.open(`Se ha Cerrado la reunión ${res['meet'].title}`, null, {
          //       duration: 4000
          //     });
          //   })
        }
      }
    })
  }
}

