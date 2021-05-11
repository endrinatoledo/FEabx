import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpService} from '../../../shared/services/http.service';
import {MatSnackBar} from '@angular/material'
import {LandingConstants} from '../landing-constants';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordFormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.minLength(6), Validators.required]),
    newPassword: new FormControl(null, [Validators.minLength(6), Validators.required]),
    explícitPassword: new FormControl(null, [Validators.minLength(6), Validators.required])
  });

  constructor(private router: Router, private httpService: HttpService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  resetPassword() {
    const resetPassword = {
      currentPassword: this.resetPasswordFormGroup.get('currentPassword').value,
      newPassword: this.resetPasswordFormGroup.get('newPassword').value,
      explícitPassword: this.resetPasswordFormGroup.get('explícitPassword').value,

    }

    if (resetPassword.newPassword === resetPassword.explícitPassword) {
      this.httpService.post(LandingConstants.GET_RESET_PASSWORD_USER_URI(this.httpService.userId), resetPassword).subscribe(res => {
        if (res[`message`] === 'cambio de clave exitoso') {
          this.router.navigate(['/home']);
        } else {
          this.snackBar.open('Contraseña incorrecta', null, {
            duration: 4000
          });
        }
      }, error => {
        this.snackBar.open(error[`error`][`message`], null, {
          duration: 4000
        });
      });
    } else {
      this.snackBar.open('Error en la similitud de Contraseñas', null, {
        duration: 4000
      });
    }
  }

}
