import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyGroupComponent} from './my-group.component';


const routes: Routes = [
  {path: '',
  component: MyGroupComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyGroupRountingModule {
}
