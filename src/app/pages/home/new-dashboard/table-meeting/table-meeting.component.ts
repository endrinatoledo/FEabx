import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {HttpService} from '../../../../shared/services/http.service';
import {HttpAudithorService} from '../../../../shared/services/http.audithor.service';
import {TableMeetingsConstants} from './table-meeting-constants';
import {ModalService} from '../../../../shared/services/modal.service'
import { Meeting } from "../../../../shared/models/meeting";
import {FormControl, FormGroup} from '@angular/forms';
import {Group} from '../../../../shared/models/group';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LandingConstants} from "../../../landing/landing-constants";
import {Observable} from 'rxjs';
@Component({
  selector: 'app-table-meeting',
  templateUrl: './table-meeting.component.html',
  styleUrls: ['./table-meeting.component.scss']
})
export class TableMeetingComponent implements OnInit {
  @Input() noteTypeId: number;
  @Input() noteId: number;
  @Input() noteTilte: string = '';
  @Input() groups:Group[];
  @Input() groupId: number;
  @Output() activeMeetingEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() meeting;
  currentNoteType: number;
  selectMeeting : Meeting;
  activeRowId: number;
  title: string;
  nameGroup : string;
  Meetings:Meeting[] = [];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['time', 'description','group'];
  notification = [];
  showPaginator: boolean;
  pageSize: number;
  emptyNotification: string;
  MinutesInAnHour:number;
  MinutesInAnDay:number;
  MinutesInAn3Day:number;
  email: string;
  domain: string
  user : {}
  participants = [];
  sortingFormGroup: FormGroup = new FormGroup({
    by: new FormControl(null, []),
    shape: new FormControl({value: null, disabled: true}, [])
  });

  constructor(private httpService: HttpService,private modalService:ModalService,private router: Router,private snackBar: MatSnackBar) {
    this.title = 'REUNIONES';
    this.emptyNotification = TableMeetingsConstants.EMPTY_NOTIFICATIONS;
    this.dataSource = new MatTableDataSource<any>(this.Meetings);
    this.MinutesInAnHour=TableMeetingsConstants.MinutesInAnHour;
    this.MinutesInAnDay=TableMeetingsConstants.MinutesInAnDay;
    this.MinutesInAn3Day=TableMeetingsConstants.MinutesInAn3Day;
    this.currentNoteType = 0;
  }

  ngOnInit() {
    this.pageSize = 5;
    this.showPaginator = this.dataSource.data.length > this.pageSize;
    this.getMeeting();

  }
  emitNoteChangeEvent = () => this.activeMeetingEvent.emit({id: this.activeRowId, type: this.currentNoteType,meeting:this.selectMeeting});
  ngOnChanges() {
    this.getMeeting();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  openCreateModal(){
    this.modalService.modalMeeting(TableMeetingsConstants.GET_TITLE_MODAL_MEETING(),{groupId: this.groupId,groups:this.groups}).subscribe(modal=>{
        console.log(modal.meeting)
        this.httpService.post(TableMeetingsConstants.GET_ALL_MEETING(),modal.meeting).subscribe(res=>{
          this.getMeeting();
          this.sendMeetingInvitation(modal.meeting)           
          this.sendMeetingAttendanceParticipantExternal(modal.meeting)
          this.toDetailsMeeting(res.meeting)
        },error => {
          this.snackBar.open(`Ha ocurrido un error al crear la reunión`, null, {
            duration: 4000
          });
          }
        )
   })
 }

  sendMeetingInvitation(meeting){

    this.participants= meeting.participants
    this.participants.forEach(element => {
      if(typeof element === 'string' ){
        this.email = element

        const configuration={
          product:LandingConstants.GET_PRODUCT(),
          origin: LandingConstants.GET_ORIGIN(),
          to: this.email,
          type:LandingConstants.GET_TYPE(),
          actions:TableMeetingsConstants.GET_ACTIONS_MEETING_INVITATION(),
          var:[{
              title: meeting.title
            }]
        }

        this.httpService.postNotifier(TableMeetingsConstants.GET_EMAIL_MEETING_INVITATION(),configuration).subscribe(res=>{

        })
      } 

    })
 
  }

  sendMeetingAttendanceParticipantExternal(meeting){
    
    this.participants= meeting.participants
    this.participants.forEach(element => {
      if(typeof element === 'string' ){
        this.email = element 
            //consultar si el dominio y el usuario existe 
            this.httpService.get(TableMeetingsConstants.GET_DOMAIN_BY_EMAIL(this.email)).subscribe(res=>{

              if((res.domain === null)&&(res.user === null)){

                this.groups.forEach(element => {      
                  if(element.id == meeting.grpId){
                    this.nameGroup = element.name
                  }
                })

                const configuration={
                  product:LandingConstants.GET_PRODUCT(),
                  origin: LandingConstants.GET_ORIGIN(),
                  to: this.email,
                  type:LandingConstants.GET_TYPE(),
                  actions:TableMeetingsConstants.GET_ACTIONS_MEETING_ATTENDANCE(),
                  var:[{
                      title: meeting.title,
                      group: this.nameGroup
                    }]
                }
                this.httpService.postNotifier(TableMeetingsConstants.GET_EMAIL_MEETING_ATTENDANCE(),configuration).subscribe(res=>{
                })
              }
            })
      } 
    })  
  }

  toDetailsMeeting(meeting:Meeting){
      this.httpService.selectMeeting=meeting;
      this.router.navigate(['/home/meeting/information'])
  }

  getNotifications(row) {
    this.activeRowId = row.id;
    this.selectMeeting = row;
    this.emitNoteChangeEvent();
  }
  ngOnDestroy(): void {}

  getMeeting() {
    this.httpService.get(TableMeetingsConstants.GET_ALL_MEETING()).subscribe(res=>{
      this.Meetings = res.meeting;
      if(this.groupId ) this.Meetings = this.Meetings.filter((m) => m.grpId === this.groupId)
      this.dataSource.data = Object.assign([], this.Meetings);
      this.showPaginator = this.dataSource.data.length > this.pageSize;
    })
  }

  getHours(fecha){
    var fechaini = Date.parse(fecha);
    var fechafin = new Date();
    var diasdif= fechafin.getTime()-fechaini;
    var contdias = Math.floor(diasdif/(1000*60*60));
    return contdias
  }

  getMinutes(fecha){
    var fechaini = Date.parse(fecha);
    var fechafin = new Date();
    var diasdif= fechafin.getTime()-fechaini;
    var contMin = ( Math.floor(diasdif/(1000*60)));
    return contMin
  }


}
