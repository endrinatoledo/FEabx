import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpService} from '../../shared/services/http.service';
import {MatSnackBar} from '@angular/material';
import {LandingConstants} from '../../pages/landing/landing-constants';

@Injectable({
  providedIn: 'root'
})
export class CanActivateByAuthGuardService implements CanActivate {

  constructor(private router: Router, private httpService: HttpService, private snackBar: MatSnackBar) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

    // Validamos si existe token, la sesion es valida.
    return this.checkToken();

  }

  /**
   * Metodo encargado de verificar la valides del token en el BE
   */
  async checkToken(): Promise<boolean> {
    const token = { // construccion de objeto para que la peticion sea JSON
      token: this.httpService.getToken()
    };

    // Destructuracion de respuesta para mantener logica anterior, si el token es valido entonces setea los valores
    ({id: this.httpService.userId, name: this.httpService.name} = await // Esperamos sincronamente que el obsevable retorne
      this.httpService.post(LandingConstants.GET_USER_DATA(), token).toPromise()); // Continuacion del await de arriba ^^^
    // Convertimos a promesa para que la destructuracion funcione ^^^

    // Se mantiene la logica anterior
    if (!this.httpService.userId) {
      this.snackBar.open('Debe iniciar sesión', null, {
        duration: 4000
      });
      await this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }

  }
}
