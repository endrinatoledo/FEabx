import { Component, OnInit,Input,Host } from '@angular/core';
import {HttpService} from '../../../../shared/services/http.service';
import {Group} from '../../../../shared/models/group';
import {Router} from '@angular/router';
import {GroupConstants} from '../group-constants';
import {User} from '../../../../shared/models/user';
import {DashboardConstants} from "../../dashboard/dashboard-constants";
import {ItemGroupConstants} from "../../../../shared/components/groups/item-group/item-group-constants";

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  groupDetails:Group;
  rol:string;
  participants:User[]=[];
  maxPart:number=0;
  additional:string='';
  idGroup:number

  constructor(private httpService: HttpService, private router:Router) {}

  ngOnInit() {
    this.groupDetails=this.httpService.selectGroup;
    this.getRol(this.httpService.userId,this.httpService.selectGroup.id);
  }

  ToNotes(){
    this.router.navigate(['home/group/group-details/notes']);
  }
  ToGeneral(){
    this.router.navigate(['home/group/group-details/general']);
  }
  ToUpdateGroups(group:Group){
    this.httpService.updateGroup=group;
    this.router.navigate(['home/group/group-update']);
  }
  getRol(idUser,IdGroup){
    this.httpService.get(GroupConstants.GET_ROL_BY_USER(idUser,IdGroup)).subscribe(res=>this.rol=res.rol.rolId);
  }
  ToParticipants(){
    this.router.navigate(['home/group/group-details/participants']);
  }

}
