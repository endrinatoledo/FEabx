import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Group} from '../../../../shared/models/group';
import {HttpService} from '../../../../shared/services/http.service';
import {CreateGroupConstants} from './create-group-constants'

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  groups: Group[];
 
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    if (this.router.url === '/home/add') this.httpService.updateGroup=undefined;
    this.getGroupsByUser(this.httpService.userId);
  }
  getGroupsByUser(id: number) {
     this.httpService.get(CreateGroupConstants.GET_GROUPS_BY_USER_URI(id)).subscribe(res => {
      this.groups = res.groups;
      this.groups =  this.groups.filter(g=> g.parentId!==null );
    });
  }
  updateGroups(){
    this.getGroupsByUser(this.httpService.userId);
  }

}
