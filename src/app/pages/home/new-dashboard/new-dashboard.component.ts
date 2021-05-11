import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../../../shared/models/group';
import {User} from '../../../shared/models/user';
import { Meeting } from '../../../shared/models/meeting';
import {HttpService} from '../../../shared/services/http.service';
import {NewDashboardConstants} from './new-dashboard-constants';
import {ModalService} from '../../../shared/services/modal.service'

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.scss']
})
export class NewDashboardComponent implements OnInit {
  groups: Group[];
  members: User[];
  groupId: number;
  selectGroup: Group;
  selectMeeting : Meeting;
  assigmentStatus = [
    {id: 1, status: 'pendiente'},
    {id: 2, status: 'activo'},
    {id: 3, status: 'cerrado'},
    {id: 4, status: 'precerrado'},
  ];

  noteId: number;
  noteTypeId: number;
  noteTilte:string='';
  constructor(private httpService: HttpService,private modalService:ModalService) {
  }
  ngOnChanges(){

  }
  ngOnInit() {
    this.getGroupsByUser(this.httpService.userId);
    this.getUsersByAllGroups(this.httpService.userId);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }
  getId(dataToBeIssued){
    this.noteId=dataToBeIssued.noteId;
    this.noteTypeId=dataToBeIssued.noteTypeId;
    this.noteTilte=dataToBeIssued.title;
  }
  getGroupsByUser(id: number) {
    this.httpService.get(NewDashboardConstants.GET_GROUPS_BY_USER_URI(id)).subscribe(res => {
      this.groups = res.groups;
      this.groups =this.groups.filter(g=> g.parentId!==null ) ;
      this.selectGroup=res.groups;
    });
  }

  getUsersByAllGroups(id: number) {
    this.httpService.get(NewDashboardConstants.GET_USERS_BY_ALL_GROUPS_URI(id)).subscribe(res => {
      this.members = res.users;
    });
  }

  onNoteChange(event) {
    if(event.id){
      this.noteTypeId = event.type;
      this.noteId = event.id;
   }
  }
  onNoteChangeMeeting(event) {
    if(event.id){
      this.selectMeeting= event.meeting;
      this.noteTypeId = event.type;
      this.noteId = event.id;
   }
  }
  updateSelect=(id:number)=>{
    this.groupId=id;
  }

  getGroupAssi(id:number){
    this.groupId=id;
   // this.selectMeeting.id = 0;
  }


}
