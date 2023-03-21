import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitucionComponent } from './institucion/institucion.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CeaRoutingModule } from './cea-routing.module';
import { AgregarEditarInstitucionComponent } from './agregar-editar-institucion/agregar-editar-institucion.component';
import { VisitaComponent } from './visita/visita.component';
import { AgregarEditarVisitaComponent } from './agregar-editar-visita/agregar-editar-visita.component';
import { SeleccionarVisitaComponent } from './seleccionar-visita/seleccionar-visita.component';




@NgModule({
  declarations: [
    InstitucionComponent,
    AgregarEditarInstitucionComponent,
    VisitaComponent,
    AgregarEditarVisitaComponent,
    SeleccionarVisitaComponent
  ],
  imports: [
    CommonModule,
    CeaRoutingModule,
    SharedModule,

    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
   
  ],
  exports:[
    InstitucionComponent,
    VisitaComponent,
    SeleccionarVisitaComponent
  ]
})
export class CeaModule { }
