import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../../shared/services/http.service';
import {Router} from '@angular/router';
import {CreateGroupConstants} from "../create-group/create-group-constants";
import {GroupCreateConstants} from '../../../../shared/components/groups/group-create/group-create-constants';
import {Group} from '../../../../shared/models/group';

@Component({
  selector: 'app-group-affiliation',
  templateUrl: './group-affiliation.component.html',
  styleUrls: ['./group-affiliation.component.scss']
})
export class GroupAffiliationComponent implements OnInit {
  groups: Group[];
  data = [];

  constructor(private httpService: HttpService, private router: Router) {
  }

  ngOnInit() {
    this.getOrgGroups(this.httpService.userId)
  }

  getOrgGroups(id: number) {
    this.httpService.get(GroupCreateConstants.GET_GROUPS_AND_USERS_BY_ORG_URI(id)).subscribe(res => {
      function removeItemFromArr(arr, item) {
        let i = arr.indexOf(item);
        if (i !== -1) {
          arr.splice(i, 1);
        }
      }

      [...res.groups].map(group => {
        this.data.push(group);
        if (group[`user`]) {
          if (group[`user`][`status`] === 1) {
            this.data.find(element => {
              if (element === group) {
                removeItemFromArr(this.data, element);
              }
            });
          }
        }
      });
      this.groups = this.data;
    });

  }
}
