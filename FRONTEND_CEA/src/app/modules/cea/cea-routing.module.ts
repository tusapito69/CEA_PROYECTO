import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitucionComponent } from './institucion/institucion.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'institucion', component:InstitucionComponent},
      { path: '**', redirectTo: 'institucion', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  CeaRoutingModule { }
