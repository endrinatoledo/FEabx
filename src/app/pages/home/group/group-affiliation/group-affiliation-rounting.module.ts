import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupAffiliationComponent} from './group-affiliation.component';


const routes: Routes = [
  {path: '',
  component: GroupAffiliationComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupAffiliationRountingModule {
}
