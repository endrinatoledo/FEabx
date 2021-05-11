import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../../../../shared/services/http.service";
import {GroupConstants} from "../../../group-constants";
import { faAward, faListAlt, faTasks, faFileAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-progress-group',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  constructor(private httpService: HttpService) { }
  stats;
  faAward = faAward;
  faListAlt= faListAlt;
  faTasks=faTasks;
  faFileAlt= faFileAlt;
  ngOnInit() {
    this.getStatistics()
  }

  getStatistics(){
    this.httpService.get(GroupConstants.GET_STATISTICS_GROUP(this.httpService.selectGroup.id)).subscribe((res)=>{
      this.stats = res['statistics']
    }, (err)=>{

    })
  }

}
