import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginusuarioGuard } from 'src/app/guards/loginusuario.guard';




const routes: Routes = [
  {
    path: '',  canActivate:[LoginusuarioGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent} ,
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
