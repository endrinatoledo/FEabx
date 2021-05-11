import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../../shared/services/http.service';
import {LandingConstants} from '../../../landing/landing-constants';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-tab-change-password',
  templateUrl: './tab-change-password.component.html',
  styleUrls: ['./tab-change-password.component.scss']
})
export class TabChangePasswordComponent implements OnInit {
  updatePasswordUser: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.minLength(6), Validators.required]),
    newPassword: new FormControl(null, [Validators.minLength(6), Validators.required]),
    explícitPassword: new FormControl(null, [Validators.minLength(6), Validators.required])
  });

  constructor(private httpService: HttpService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  updatePassword() {
    const data = {
      currentPassword: this.updatePasswordUser.get('currentPassword').value,
      newPassword: this.updatePasswordUser.get('newPassword').value,
      explícitPassword: this.updatePasswordUser.get('explícitPassword').value,
    };
    if (data.currentPassword === null || data.newPassword === null || data.explícitPassword === null) {
      this.snackBar.open('Los Campos son obligatorios', null, {
        duration: 4000
      });
    } else {
      if (data.newPassword === data.explícitPassword) {
        // this.httpService.userId
        this.httpService.post(LandingConstants.GET_RESET_PASSWORD_USER_URI(this.httpService.userId), data).subscribe(res => {
          if (res[`message`] === 'cambio de clave exitoso') {
            this.snackBar.open('cambio de clave exitoso', null, {
              duration: 4000
            });
          } else {
            this.snackBar.open(res[`message`], null, {
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
}
