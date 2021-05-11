import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpService} from '../../../services/http.service'
import {ItemGroupConstants} from './item-group-constants'
import {Group} from '../../../models/group'
import {Assignment} from '../../../models/assignment'
import {Agreement} from '../../../models/agreement'
@Component({
  selector: 'app-item-group',
  templateUrl: './item-group.component.html',
  styleUrls: ['./item-group.component.scss']
})
export class ItemGroupComponent implements OnInit {
  @Input() logoSrc: string;
  @Input() group: Group;
  @Input() selectid;
  assignments:Assignment[]=[];
  agreements:Agreement[]=[];
  oneCicleColor:string='';
  twoCicleColor:string='';
  threeCicleColor:string='';
  fourCicleColor:string='';
  fiveCicleColor:string='';
  sub:string='circle';
  constructor(private sanitizer: DomSanitizer, private httpService : HttpService) {
  }
  ngOnChanges(){
    if(this.selectid===this.group.id){
      this.sub='pintar'
    }else
    {
      this.sub='circle'
    }
  }

  ngOnInit() {

    this.exitAssiPreClosegByGroup(this.group.id);
    this.exitAgreeByGroup(this.group.id);
    this.criticalAssignments(this.group.id);
    this.exitOpenMeetings(this.group.id)
  }

  getSecureUrl() {
    const logo = this.logoSrc ? this.logoSrc : '../../../../../assets/images/group-defaul.png';
    const style = `background-image: url(${logo})`;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }


  exitAssiPreClosegByGroup(idGroup: number) {

    if(idGroup!=undefined)
    {
      this.httpService.get(ItemGroupConstants.GET_ASSIGNMENTS_BY_GROUP_URI(idGroup)).subscribe(res=>{
        this.assignments=res['assignments'];
        this.assignments=this.assignments.filter((assignments)=> assignments.status == 4);
        if(this.assignments.length != 0){  this.threeCicleColor='color-yellow';  }
     })
    }
  }

  criticalAssignments(idGroup: number) {

    if(idGroup!=undefined)
    {
      this.httpService.get(ItemGroupConstants.GET_ASSIGNMENTS_BY_GROUP_URI(idGroup)).subscribe(res=>{
        this.assignments=res['assignments'];
        this.assignments.forEach(a=>{
        let datfinalDate=new Date(a.finalDate);
        let date=new Date();
        if(((datfinalDate.getTime() - date.getTime())/86400000 <= a.notification) && a.status!=4 && a.status!=3 )
        {
            this.fiveCicleColor='color-red';
        }

        })
     })
    }
  }


 exitAgreeByGroup(idGroup: number) {
    if(idGroup!=undefined)
    {
     this.httpService.get(ItemGroupConstants.GET_AGREEMENT_BY_GROUP_URI(idGroup)).subscribe(res=>{
      if((res['agreements'].length != 0)){this.fourCicleColor='color-green';}
     })
    }
  }

  exitOpenMeetings(idGroup: number) {
    if(idGroup!=undefined)
    {
      this.httpService.get(ItemGroupConstants.GET_OPEN_MEETINGS_BY_GROUP_URI(idGroup)).subscribe(res=>{
        if((res['meeting'].length != 0)){this.twoCicleColor='color-gray';}
      })
    }
  }

}
