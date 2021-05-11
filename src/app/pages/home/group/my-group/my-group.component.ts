import { Component, OnInit, Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Group} from '../../../../shared/models/group';
import {GroupConstants} from '../group-constants';
import {HttpService} from '../../../../shared/services/http.service';

@Component({
  selector: 'app-my-group',
  templateUrl: './my-group.component.html',
  styleUrls: ['./my-group.component.scss']
})
export class MyGroupComponent implements OnInit {
  form: FormGroup = new FormGroup({
    search: new FormControl(),
    optionFliter: new FormControl()
  });
  optionList=[
    {
      descriton:'Nombre',
      id:1
    },
    { 
      descriton:'Descripción',
      id:2
    }
  ]
  groups: Group[];
  groupsAux:Group[];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
  this.getGroupsByUser(this.httpService.userId);
 

}


  getGroupsByUser(id: number) {
    this.httpService.get(GroupConstants.GET_GROUPS_BY_USER_URI(id)).subscribe(res => {
      this.groups = res.groups;
      this.groups =this.groups.filter(g=> g.parentId!==null ) ;
      this.groupsAux=this.groups  ;
    });
  }

  updateGroups(){this.getGroupsByUser(this.httpService.userId)}
  searchGroup(){
    if(this.form.get('search').value != "")
    {
      switch (this.form.get('optionFliter').value)
      {
        case 1:
          this.groups=this.groupsAux;
          this.groups=this.groups.filter((g)=>g.name === this.form.get('search').value)
          break;
        case 2:
          this.groups=this.groupsAux;
          this.groups=this.groups.filter((g)=> g.description.includes( this.form.get('search').value))
          break;
      }
    }else
    {
      this.getGroupsByUser(this.httpService.userId);

    }
  }
}
