import {Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {Group} from '../../../models/group';
import {HttpService} from '../../../../shared/services/http.service';
import {Router} from '@angular/router';
import { faAward,faCertificate, faUser } from '@fortawesome/free-solid-svg-icons';
import {GroupContainerConstants} from './group-container-constants'
import {ItemGroupComponent} from "../item-group/item-group.component";
import {ItemGroupConstants} from "../item-group/item-group-constants";
import {tokenReference} from "@angular/compiler";
@Component({
  selector: 'app-group-container',
  templateUrl: './group-container.component.html',
  styleUrls: ['./group-container.component.scss']
})
export class GroupContainerComponent implements OnInit {
  faAward = faAward;
  faCertificate= faCertificate;
  faUser=faUser
  @Input() groups: Group[];
  @Output() salida=new EventEmitter<any>()
  @Output() leader=new EventEmitter<any>()
  @Output() suplente=new EventEmitter<any>()
  @Output() user=new EventEmitter<any>()
  @Output() rolInGroup = new EventEmitter<string>();
  @Output() cambiarSelect=new EventEmitter<any>()
  @Output() sightview= new EventEmitter<boolean>();
  @Input() selectGroupid: number;
  @Input() isLoadingGroups: boolean;
  enableSightview:boolean=false;
  rolSelected:String;
  slideConfig = {
    slidesToShow: 10,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 959,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
  };


  constructor(private router: Router ,private httpService:HttpService) {
  }

  ngOnInit() {
    // this.user.emit(this.groups);
    this.rolInGroup.emit('Participant')
    this.rolSelected = 'Participant'
  }
  routeTo(){

    this.router.navigate(['home/group/create-group']);
  }

  routeToDetails(group:Group){

    this.httpService.selectGroup=group;
    this.router.navigate(['home/group/group-details/general']);


  }
  salida2(){
    this.selectGroupid=0;
    this. getGroupAssi(this.selectGroupid)
  }

  getGroupAssi(id){
    if(this.selectGroupid!=id){
      this.selectGroupid=id;
      this.salida.emit(this.selectGroupid)
    }else{
      this.selectGroupid=0;
      this.salida.emit(this.selectGroupid)

    }
  }

  groupsAsRol(rol){
    this.rolSelected = rol
    switch (rol) {
      case 'Leader':
        this.leader.emit(this.groups);
        this.rolInGroup.emit('Leader')
      break;
      case 'Participant':
        this.user.emit(this.groups);
        this.rolInGroup.emit('Participant')
      break;
      case 'Suplente':
        this.suplente.emit(this.groups);
        this.rolInGroup.emit('Suplente')
        break;
    }
  }

  generalView(id){
    if(this.enableSightview){
      this.enableSightview=false;
      this.sightview.emit(this.enableSightview)
      this.salida.emit(id)
    }else{
      this.enableSightview = true;
      this.sightview.emit(this.enableSightview)
      this.salida.emit(id)
    }
  }

}
