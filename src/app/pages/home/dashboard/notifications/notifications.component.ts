import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {HttpService} from '../../../../shared/services/http.service';
import {HttpAudithorService} from '../../../../shared/services/http.audithor.service';
import {NotificationsConstants} from './notifications-constants';
import { History } from "../../../../shared/models/history";
import {Group} from "../../../../shared/models/group";
import {NotesConstants} from "../notes/notes-constants";

@Component({
  selector: 'app-home-noti',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() noteTypeId: number;
  @Input() noteId: number;
  @Input() noteTilte: string = '';
  @Input() groups:Group[];
  @Input() view;
  @Input() assignments;
  @Input() agreements;
  title: string;
  historyNotes:History[] = [];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['time', 'description'];
  notification = [];
  showPaginator: boolean;
  pageSize: number;
  emptyNotification: string;
  MinutesInAnHour:number;
  MinutesInAnDay:number;
  MinutesInAn3Day:number;


  constructor(private httpService: HttpService,private httpAudithorService:HttpAudithorService) {
    this.title = 'ACTUALIZACIONES';
    this.emptyNotification = NotificationsConstants.EMPTY_NOTIFICATIONS;
    this.dataSource = new MatTableDataSource<any>(this.notification);
    this.MinutesInAnHour=NotificationsConstants.MinutesInAnHour;
    this.MinutesInAnDay=NotificationsConstants.MinutesInAnDay;
    this.MinutesInAn3Day=NotificationsConstants.MinutesInAn3Day;
  }

  ngOnInit() {
    if(this.view){
      this.pageSize = 30;
    }else{
      this.pageSize = 5;
      this.showPaginator = this.dataSource.data.length > this.pageSize;
    }
  }

  ngOnChanges() {
    if(this.view){this.getHistoryAllAsg();}
    if(!this.noteId){this.dataSource.data = [];
    }else{this.getNotifications()}
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {}

  getNotifications() {
    switch (this.noteTypeId) {
      case 1:
        this.getHistoryByAsg(this.noteId);
        break;
      case 2:
        this.getHistoryAgre(this.noteId);
        break;
    }
  }

  getHistoryAllAsg(){
    this.httpAudithorService.get(NotificationsConstants.GET_ALL_HISTORY()).subscribe((res) => {
      let historyAss = res['history']
      let newArr = [];
      this.httpService.get(NotesConstants.GET_ASSIGN_AND_AGREE_BY_GROUP(this.httpService.selectGroup.id)).subscribe((res) =>{
        let notes=res.notes;
        notes.assingments.forEach(function (note,idx) {
          historyAss.forEach(function (hist,j) {
            if (hist.his_entity === 'assignment'){
              if(hist.his_identity === note.id){
                hist['noteTitle'] = note.title
                newArr.push(hist);
              }
            }
          })
        })

        notes.agreements.forEach(function (note,idx) {
          historyAss.forEach(function (hist,j) {
            if (hist.his_entity === 'agreement'){
              if(hist.his_identity === note.id){
                hist['noteTitle'] = note.title
                newArr.push(hist);
              }
            }
          })
        })

        // @ts-ignore
        this.historyNotes= newArr.sort((a, b) =>   new Date(b.his_date) - new Date(a.his_date))
        this.historyNotes.forEach((e)=>{
          this.httpService.get(NotificationsConstants.GET_USER_BY_ID(e['his_user'])).subscribe(res=>{
            e['userName']=res.user.firstName + ' ' +res.user.lastName[0]
          })
        })
        this.dataSource.data = Object.assign([], this.historyNotes);
        // this.showPaginator = this.dataSource.data.length >= this.pageSize;
        // this.paginator.length=this.historyNotes.length;
        // this.paginator.pageIndex=0;
        this.pageSize = 30;
      })

      },
      (error) => {
        this.dataSource.data = Object.assign([], []);
      })
  }

  getHistoryByAsg(id:number){
    this.httpAudithorService.get(NotificationsConstants.GET_HISTORY_BY_ASSIGNMENT(id)).subscribe((res) => {
      let newArr = [];
      let historyAss = res['history']
        this.assignments.forEach(function (list, i) {
          historyAss.forEach(function (hist,j) {
            if (hist.his_identity === list.id){
              hist['noteTitle'] = list.title
              newArr.push(hist);
            }
          })
        })
        this.historyNotes = historyAss;
        this.historyNotes.forEach((e)=>{
          this.httpService.get(NotificationsConstants.GET_USER_BY_ID(e['his_user'])).subscribe(res=>{
            e['userName']=res.user.firstName + ' ' +res.user.lastName[0]
          })
        })
      if(!this.noteId)this.dataSource.data = Object.assign([], []);
       else this.dataSource.data = Object.assign([], this.historyNotes);
      },
      (error) => {
        this.dataSource.data = Object.assign([], []);
      })

  }

  getHistoryAgre(id:number){
    this.httpAudithorService.get(NotificationsConstants.GET_HISTORY_BY_AGREEMENT(id)).subscribe(res=>{
      let newArr = [];
      let historyAgr = res['history']
      this.agreements.forEach(function (list, i) {
        historyAgr.forEach(function (hist,j) {
          if (hist.his_identity === list.id){
            hist['noteTitle'] = list.title
            newArr.push(hist);
          }
        })
      })
      this.historyNotes = newArr;
      this.historyNotes.forEach((e)=>{
        this.httpService.get(NotificationsConstants.GET_USER_BY_ID(e['his_user'])).subscribe(res=>{
          e['userName']=res.user.firstName + ' ' +res.user.lastName[0]
        })
      })
      this.dataSource.data = Object.assign([], this.historyNotes);
    }, error =>{
      this.dataSource.data = Object.assign([], []);
    })
  }

  getHours(fecha){
    var fechaini = Date.parse(fecha);
    var fechafin = new Date();
    var diasdif= fechafin.getTime()-fechaini;
    var contdias = Math.floor(diasdif/(1000*60*60));
    return contdias
  }

  getMinutes(fecha){
    var fechaini = Date.parse(fecha);
    var fechafin = new Date();
    var diasdif= fechafin.getTime()-fechaini;
    var contMin = Math.floor(diasdif/(1000*60));
    return contMin
  }

}
