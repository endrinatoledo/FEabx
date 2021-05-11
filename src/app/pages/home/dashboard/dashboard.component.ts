import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../../../shared/models/group';
import {User} from '../../../shared/models/user';
import {HttpService} from '../../../shared/services/http.service';
import {DashboardConstants} from './dashboard-constants';
import {ModalService} from '../../../shared/services/modal.service'
import {ItemGroupConstants} from "../../../shared/components/groups/item-group/item-group-constants";
import {Observable} from "rxjs";
@Component({
  selector: 'app-home-dash',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  groups: Group[];
  members: User[];
  groupId: number;
  selectGroup: Group;
  assigmentStatus = [
    {id: 1, status: 'pendiente'},
    {id: 2, status: 'activo'},
    {id: 3, status: 'cerrado'},
    {id: 4, status: 'precerrado'},
  ];
  rolInGroup:string;
  sigthView:boolean;
  noteId: number;
  assignments;
  agreements;
  noteTypeId: number;
  noteTilte:string='';
  isLoadingGroups:Boolean;
  constructor(private httpService: HttpService,private modalService:ModalService) {
    this.isLoadingGroups=false;
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

  getAssignList(assignList){
    this.assignments = assignList
  }

  getAgreeList(agreeList){
    this.agreements = agreeList
  }

  getGroupsByUser(id: number) {
    this.isLoadingGroups = true;
    this.httpService.get(DashboardConstants.GET_GROUPS_BY_USER_URI(id)).subscribe(res => {
      this.groups = res.groups;
      this.groups =this.groups.filter(g=> g.parentId!==null ) ;
      this.selectGroup=res.groups;
      this.groups.map((group, index) => {
        this.httpService.get(ItemGroupConstants.GET_LEADER_BY_GROUP(group.id)).subscribe(res=>{
          if(res['user'] != undefined && res['user'].id == this.httpService.userId )
          {
            this.groups[index].leaderId = res['user'].id;
          }
        })

      })
      this.isLoadingGroups = false;
    });
  }

  getGroupsByUserAndView(id,view){
    this.isLoadingGroups = true;
    this.httpService.get(DashboardConstants.GET_GROUPS_BY_USER_URI(id)).subscribe(res => {
      let data = res.groups;
      if(view==='Leader'){
        this.groups = data.filter(g=>g.usersrolatr[0].rol_id === '1,2')
        this.isLoadingGroups = false;}
      else {
        this.groups = data.filter(g=>g.usersrolatr[0].rol_id === '2,3')
        this.isLoadingGroups = false;}
    });
  }

  getUsersByAllGroups(id: number) {
    this.httpService.get(DashboardConstants.GET_USERS_BY_ALL_GROUPS_URI(id)).subscribe(res => {
      this.members = res.users;
    });
  }

  onNoteChange(event) {
    this.noteTypeId = event.type;
    this.noteId = event.id;
  }
  updateSelect=(id:number)=>{
    this.groupId=id;
  }

  getGroupAssi(id:number){
    this.groupId=id;
   /* this.modalService.modalMeeting(DashboardConstants.GET_TITLE_MODAL_MEETING(),{groupId: this.groupId,groups:this.groups}).subscribe(modal=>{
    })*/
  }

  getGroupsAsLeader(groups){
    this.getGroupsByUserAndView(this.httpService.userId,'Leader')
  }

  getGroupsAsSuplent(groups){
    this.getGroupsByUserAndView(this.httpService.userId,'Suplente')
  }

  rolToSelect(rol){
    this.rolInGroup = rol
  }
  generalView(opt){
    this.sigthView = opt
  }

}
