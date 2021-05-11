import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanActivateByAuthGuardService} from './core/utils/can-activate-by-auth-guard.service';
import {Error404Component} from "./shared/components/errors/error404/error404.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [CanActivateByAuthGuardService]
  },

  { path: '**',
    redirectTo: '404'
  },
  {
    path: '404',
    component: Error404Component
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
