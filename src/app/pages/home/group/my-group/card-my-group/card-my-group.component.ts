import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Group} from '../../../../../shared/models/group';
import {ModalService} from '../../../../../shared/services/modal.service';
import {HttpService} from '../../../../../shared/services/http.service';
import {CardMyGroupConstants} from './card-my-group-constants'

@Component({
  selector: 'app-card-my-group',
  templateUrl: './card-my-group.component.html',
  styleUrls: ['./card-my-group.component.scss']
})
export class CardMyGroupComponent implements OnInit {

  @Input() group;
  @Output() salida=new EventEmitter<any>();
  leader:string="";
  tags:string="Grupo, aplicacion";
  NumberNotes:number=0;
  rol:string;
  constructor(private router: Router,private httpService: HttpService, private modalService:ModalService ) { }

  ngOnInit() {
    this.getLeaderByGroup(((this.group==null? 0 : this.group.id)));
    this.getAssignmentsGroup(((this.group==null? 0 : this.group.id)));
    this.getAgreementGroup(((this.group==null? 0 : this.group.id)));
    this.getRol(this.httpService.userId,this.group==null? 0 : this.group.id);
  }

  toDetails(group:Group){
   this.httpService.selectGroup=group;
    this.router.navigate(['home/group/group-details/general']);
  }
  toDetailsNotes(group:Group){
    this.httpService.selectGroup=group;
     this.router.navigate(['home/group/group-details/notes']);
   }

  OpenModalEliminar(group:Group)
  {
    this.modalService.modalDeleteGroup(CardMyGroupConstants.GET_TITLE_MODAL(), {group: group}).subscribe(modal => {
     
      this.UpdateGroups();
    });
  }

  UpdateGroups(){this.salida.emit()}
 
  getLeaderByGroup(idGroup:number)
  {
    this.httpService.get(CardMyGroupConstants.GET_GROUP_LEARDE_URL(((this.group==null? 0 : this.group.id)))).subscribe(res=>{
      this.leader=res['user'].firstName +' ' + res['user'].lastName;

    });

  }

  getAssignmentsGroup(idGroup: number) {
    if(idGroup!=undefined)
    {
     this.httpService.get(CardMyGroupConstants.GET_ASSIGNMENTS_BY_GROUP_URI(idGroup)).subscribe(res=>{
       this.NumberNotes=this.NumberNotes+res['assignments'].length;
       
  
     })
    }
  }
  getAgreementGroup(idGroup: number) {
    if(idGroup!=undefined)
    {
     this.httpService.get(CardMyGroupConstants.GET_AGREEMENT_BY_GROUP_URI(idGroup)).subscribe(res=>{
      this.NumberNotes=this.NumberNotes+res['agreements'].length;
     })
    }
  }
  getRol(idUser,IdGroup){
    this.httpService.get(CardMyGroupConstants.GET_ROL_BY_USER(idUser,IdGroup)).subscribe(res=>{
      this.rol=res.rol.rolId
    });
  }

}
