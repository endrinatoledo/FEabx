import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {CanActivateByAuthGuardService} from '../../core/utils/can-activate-by-auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path:'',
        redirectTo:"/home/dashboard",
        pathMatch:'full'

      },
      {
        path:'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [CanActivateByAuthGuardService]
      },
      {
        path: 'group',
        loadChildren: () => import('./group/group.module').then(m => m.GroupModule),
        canActivate: [CanActivateByAuthGuardService]
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        canActivate: [CanActivateByAuthGuardService]
      },
      {
        path: 'meeting',
        loadChildren: () => import('./new-dashboard/new-dashboard.module').then(m => m.NewDashboardModule),
        canActivate: [CanActivateByAuthGuardService]
      },
      {
        path: 'meeting/information',
        loadChildren: () => import('./meeting/meeting.module').then(m => m.MeetingModule),
        canActivate: [CanActivateByAuthGuardService]
      }
    ]


  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRountingModule {
}
