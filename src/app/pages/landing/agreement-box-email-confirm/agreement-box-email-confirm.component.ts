
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClientModule } from '@angular/common/http';
import {HttpService} from '../../../shared/services/http.service';



@Component({
  selector: 'app-agreement-box-email-confirm',
  templateUrl: './agreement-box-email-confirm.component.html',
  styleUrls: ['./agreement-box-email-confirm.component.scss']
})
export class AgreementBoxEmailConfirmComponent implements OnInit {
  mensaje:string="Se le ha enviando un correo Electrónico para validar la cuenta"

  constructor(private httpService:HttpService,private router: Router) { }


  ngOnInit() {
  }

}
