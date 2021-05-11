import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, EmailValidator} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpService} from '../../../shared/services/http.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {
  email:string;
 
  loginFormGroup = new FormGroup({
    email: new FormControl(null, [Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'), Validators.required]),
    password: new FormControl(null, [Validators.minLength(6), Validators.required])
  });
  constructor(private httpService:HttpService,private router: Router) { }

  ngOnInit() {
   
   this.email=this.httpService.email;
   
  }
  hasError(controlName: string, errorName: string) {
    return this.loginFormGroup.controls[controlName].hasError(errorName);
  }

      
  
}
