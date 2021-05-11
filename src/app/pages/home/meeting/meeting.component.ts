import { Component, OnInit } from '@angular/core';
import {Meeting} from "../../../shared/models/meeting";
import {HttpService} from "../../../shared/services/http.service";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {
  noteId:number;
  data:any;
  meetingDetails:Meeting;
  partsMeetings=[];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.meetingDetails=this.httpService.selectMeeting;
    this.partsMeetings =this.httpService.participants;
  }
  selec(id){
    this.noteId = id;
  }
  selectDataNote(a){
    this.data = a;
  }
}
