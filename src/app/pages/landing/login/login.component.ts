import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpService} from '../../../shared/services/http.service';
import {MatSnackBar} from '@angular/material';
import {LandingConstants} from '../landing-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup = new FormGroup({
    email: new FormControl(null, [Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'), Validators.required]),
    password: new FormControl(null, [Validators.minLength(6), Validators.required])
  });
  public loading:boolean
  constructor(private router: Router, private httpService: HttpService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loading = false;
  }

  hasError(controlName: string, errorName: string) {
    return this.loginFormGroup.controls[controlName].hasError(errorName);
  }

  signIn() {
    if (this.loginFormGroup.valid) {
      this.loading = true;
      // this.httpService.get(LandingConstants.GET_USER_BY_EMAIL_URI(this.loginFormGroup.get('email').value)).subscribe(res=>{
      const userInfo = {
        email: this.loginFormGroup.get('email').value,
        password: this.loginFormGroup.get('password').value,
      };
      this.httpService.post(LandingConstants.GET_USER_BY_EMAIL_URI_LOGIN(), userInfo).subscribe(res => {

        if (res && res.user && res.user.token) {
          this.httpService.saveToken(res.user.token);

          if (res.user.status === 1) {

            setTimeout(() => {
              this.loading = false;
              this.router.navigate(['/home']);
            }, 5000);

          } else {
            this.loading = false;
            this.router.navigate(['/reset-password']);
          }
        } else {
          this.loading = false;
          this.snackBar.open(res.message, null, {
            duration: 4000
          });
        }
      });
    } else {
      this.snackBar.open('Usuario o contraseña inválidos', null, {
        duration: 4000
      });
    }
  }
}
