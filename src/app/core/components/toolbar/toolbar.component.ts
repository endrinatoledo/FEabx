import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {ModalService} from '../../../../app/shared/services/modal.service';
import {HttpService} from '../../../../app/shared/services/http.service';
import {NotificationsConstants} from '../../../../app/pages/home/dashboard/notifications/notifications-constants';
import {LandingConstants} from '../../../pages/landing/landing-constants';
import {Notifications} from "../../../shared/models/notifications";
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() snav: MatSidenav;
  @Input() username: string;
  toggleSearchBar = false;
  idUserTemp: number;
  idUserObj: {};
  numNotificationUser: string;
  notificationsArr: Notifications[];

  constructor(private httpService: HttpService, private snackBar: MatSnackBar, private modalService: ModalService) {
    this.idUserTemp = this.httpService.userId;
  }

  ngOnInit() {
    this.ToNotificationUser();
  }

  ToNotificationUser() {
    this.idUserObj = {
      id: this.httpService.userId
    };
    this.httpService.postNotifier(NotificationsConstants.GET_NOTIFICATIONS_BY_USER(), this.idUserObj).subscribe(res => {
      if (res.notificationTemp === 0) {
        this.numNotificationUser = '';
      } else {
        ({notificationTemp: this.numNotificationUser, notification: this.notificationsArr} = res);
      }
    });
  }


  logout(): void {
    this.httpService.clearToken();
  }
}
