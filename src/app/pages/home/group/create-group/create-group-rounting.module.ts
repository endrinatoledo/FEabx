import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateGroupComponent} from './create-group.component';


const routes: Routes = [
  {path: '',
  component: CreateGroupComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateGroupRountingModule {
}
