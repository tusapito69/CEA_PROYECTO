import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitucionComponent } from './institucion/institucion.component';
import { VisitaComponent } from './visita/visita.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'institucion', component:InstitucionComponent},
      { path: 'visita', component:VisitaComponent},
      { path: '**', redirectTo: 'visita', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  CeaRoutingModule { }
