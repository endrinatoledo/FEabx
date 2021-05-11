import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LandingConstants} from '../landing-constants'
import {MatSnackBar} from '@angular/material';
import {HttpService} from '../../../shared/services/http.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})

export class PasswordRecoveryComponent implements OnInit {
    passwordFormGroup = new FormGroup({
    email: new FormControl(null, [Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'), Validators.required]),

  });

  constructor(private httpService: HttpService, private router: Router,private snackBar: MatSnackBar) {
  }

  ngOnInit() {}

  hasError(controlName: string, errorName: string) {
    return this.passwordFormGroup.controls[controlName].hasError(errorName);
  }

  RecoveryPassword(){

     this.httpService.get(LandingConstants.GET_USER_BY_EMAIL_URI(this.passwordFormGroup.get('email').value)).subscribe(res=>{


      if(res['user'])
      {
        this.httpService.email=res['user'].email;
        this.httpService.get(LandingConstants.GET_UPDATE_PASSWORD_USER_URI(res['user'].email))
        .subscribe(res=>
          {
            const con={
              product:LandingConstants.GET_PRODUCT(),
              origin: LandingConstants.GET_ORIGIN(),
              to: this.passwordFormGroup.get('email').value,
              type:LandingConstants.GET_TYPE(),
              actions:LandingConstants.GET_ACTIONS_RESET_PASSWORD(),
              var:[
                {
                  name:'newPassword',
                  value:res['newPassword']
                }
              ]
            }
            this.httpService.postNotifier(LandingConstants.GET_EMAIL_URI(),con).subscribe(res=>{
            })
            this.router.navigate(['/SendEmail'])

          })
       ;
    }else
    {
      this.snackBar.open('No existe un usuario con este correo electrónico', null, {
        duration: 4000
      });

    }
    })
  }
}

