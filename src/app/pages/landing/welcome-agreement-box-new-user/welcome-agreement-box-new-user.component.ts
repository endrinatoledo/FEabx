
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClientModule } from '@angular/common/http';
import {HttpService} from '../../../shared/services/http.service';



@Component({
  selector: 'app-welcome-agreement-box-new-user',
  templateUrl: './welcome-agreement-box-new-user.component.html',
  styleUrls: ['./welcome-agreement-box-new-user.component.scss']
})
export class WelcomeAgreementBoxNewUserComponent implements OnInit {
  mensaje:string="Has sido invitado a activar su usuario. Ahora vamos a proceder a conﬁgurar tu cuenta"


  constructor(private httpService:HttpService,private router: Router) { }


  ngOnInit() {
  }

}
