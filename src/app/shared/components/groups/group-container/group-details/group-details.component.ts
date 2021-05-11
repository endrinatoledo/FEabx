import {Component, Input, OnInit,Output,EventEmitter} from '@angular/core';
import {Group} from '../../../../models/group';
import {User} from '../../../../models/user';
import {HttpService} from '../../../../../shared/services/http.service';
import {GroupContainerConstants} from '../group-container-constants'
@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  @Input() group: Group;
  agreementLength : number = 0;
  assignmentsLength : number = 0;
  participants : User[] = []; 
  constructor(private httpService:HttpService) {}

  ngOnInit() {
    this.getAgreementGroup(this.group.id);
    this.getAssignmentsGroup(this.group.id);
    this.getUserByGroup(this.group.id);
  }
  getAssignmentsGroup(idGroup: number) {
    if(idGroup!=undefined)
    {
     this.httpService.get(GroupContainerConstants.GET_ASSIGNMENTS_BY_GROUP_URI(idGroup)).subscribe(res=>{
      this.assignmentsLength=res['assignments'].length;
     })
    }
  }
  getAgreementGroup(idGroup: number){
     this.httpService.get(GroupContainerConstants.GET_AGREEMENT_BY_GROUP_URI(idGroup)).subscribe(res=>{
      this.agreementLength=['agreements'].length;
     })
  }
  getUserByGroup(idGroup:number){
    this.httpService.get(GroupContainerConstants.GET_USERS_BY_GROUPS_URI(idGroup)).subscribe(res=>{
      this.participants=res['users'];
    });
  }
  
}
