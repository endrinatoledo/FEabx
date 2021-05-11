import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupDetailsComponent} from './group-details.component';


const routes: Routes = [
  {
  path: '',
  component: GroupDetailsComponent,
  children: [
    {
      path:'',
      redirectTo:"/group-details/general",
      pathMatch:'full'

    },
    {
        path: 'general',
        loadChildren: () => import('./general/general.module').then(m =>m.GeneralModule )
      
    },
    {
        path: 'notes',
        loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule)
      
    },
    {
      path: 'participants',
      loadChildren: () => import('./participants/participants.module').then(m => m.ParticipantsModule)
    
    }

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupDetailsRountingModule {
}
