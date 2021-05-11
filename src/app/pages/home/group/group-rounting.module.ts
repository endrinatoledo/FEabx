import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupComponent} from './group.component';
import {CanActivateByAuthGuardService} from '../../../core/utils/can-activate-by-auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: GroupComponent,
    children: [
      {
        path:'',
        redirectTo:"/group/create-group",
        pathMatch:'full'

      },
      {
        path: 'create-group',
        loadChildren: () => import('./create-group/create-group.module').then(m => m.CreateGroupModule),
        canActivate: [CanActivateByAuthGuardService]
      },
      {
        path: 'group-affiliation',
        loadChildren: () => import('./group-affiliation/group-affiliation.module').then(m => m.GroupAffiliationModule),
        canActivate: [CanActivateByAuthGuardService]
      },
      {
        path: 'group-details',
        loadChildren: () => import('./group-details/group-details.module').then(m =>m.GroupDetailsModule ),
        canActivate: [CanActivateByAuthGuardService]
      },
      {
        path: 'my-group',
        loadChildren: () => import('./my-group/my-group.module').then(m =>m.MyGroupModule ),
        canActivate: [CanActivateByAuthGuardService]
      },
      {
        path: 'group-update',
        loadChildren: () => import('./create-group/create-group.module').then(m => m.CreateGroupModule),
        canActivate: [CanActivateByAuthGuardService]

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRountingModule {
}
