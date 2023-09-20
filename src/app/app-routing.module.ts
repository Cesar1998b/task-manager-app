import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./tasks/task-routing.module').then((m) => m.TaskRoutingModule),
  },
  { path: '**', redirectTo: 'tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
