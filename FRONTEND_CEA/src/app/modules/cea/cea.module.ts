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
import { ReactiveFormsModule } from '@angular/forms';
import { CeaRoutingModule } from './cea-routing.module';
import { AgregarEditarInstitucionComponent } from './agregar-editar-institucion/agregar-editar-institucion.component';



@NgModule({
  declarations: [
    InstitucionComponent,
    AgregarEditarInstitucionComponent
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
    ReactiveFormsModule
   
  ],
  exports:[
    InstitucionComponent
  ]
})
export class CeaModule { }
