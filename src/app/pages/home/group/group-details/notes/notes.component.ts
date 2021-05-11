import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../../../shared/services/http.service'
import {NotesConstants} from "../../../new-dashboard/notes/notes-constants";
import {DashboardConstants} from "../../../dashboard/dashboard-constants";
import {ItemGroupConstants} from "../../../../../shared/components/groups/item-group/item-group-constants";
import {Group} from "../../../../../shared/models/group";
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NoteComponent implements OnInit {
  rolInGroup : string;
  sightview:boolean = false;
  groups: Group[] = [];
  constructor(private httpService:HttpService) { }

  ngOnInit() {
    this.getRolUser();
    this.getGroupsByUser(this.httpService.userId)
  }

  getRolUser (){
    this.httpService.get(NotesConstants.GET_ROL_BY_USER(this.httpService.userId,this.httpService.selectGroup.id)).subscribe(res=> {
      let userRol = res.rol.rolId;
      switch (userRol) {
        case '1,2':
          this.rolInGroup = 'Leader';
          break;
        case '2':
          this.rolInGroup = 'Participant';
          this.sightview = true;
          break;
        case '2,3':
          this.rolInGroup = 'Suplente'
      }
    })
  }

  getGroupsByUser(id: number) {
    this.httpService.get(DashboardConstants.GET_GROUPS_BY_USER_URI(id)).subscribe(res => {
      this.groups = res.groups;
      this.groups =this.groups.filter(g=> g.parentId!==null ) ;
      this.groups.map((group, index) => {
        this.httpService.get(ItemGroupConstants.GET_LEADER_BY_GROUP(group.id)).subscribe(res=>{
          if(res['user'] != undefined && res['user'].id == this.httpService.userId )
          {
            this.groups[index].leaderId = res['user'].id;
          }
        })
      })
    });
  }

}
