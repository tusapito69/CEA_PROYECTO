import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { VisitaService } from 'src/app/core/services/visita.service';
import { IVisita } from '../../../core/interfaces/visita';
import { AgregarEditarVisitaComponent } from '../agregar-editar-visita/agregar-editar-visita.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportesVisitaComponent } from './reportes-visita/reportes-visita.component';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.css']
})
export class VisitaComponent implements OnInit {
  id:number| undefined;
  displayedColumns:string[]=['Id','Actividad','Fecha','Lugar','Observaciones', 'Tipo', 'Estado', 'Opciones'];
  private visitas!:IVisita[];
  dataSource =new MatTableDataSource<IVisita>(this.visitas);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _visitaservice:VisitaService,public dialog: MatDialog, public dialogReporte:MatDialog) { 
    }

  ngOnInit(): void {
    this.obtenerVisitas();
    console.log(this.obtenerVisitas());
  }
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  //LISTAR VISITAS
    obtenerVisitas(){
      this._visitaservice.obtenerVisitas().subscribe((resp:IVisita[])=>{
        this.dataSource.data=resp;
        console.log(resp);
      })
    };
  //BUSCADOR
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //MODAL REPORTES
  GenerarReportes(){
    const dialogRefReporte = this.dialogReporte.open(ReportesVisitaComponent, {
      width: '700px',
      disableClose: true,
    });
  }

  AgregarEditarVisita(id?:number){
    const dialogRef = this.dialog.open(AgregarEditarVisitaComponent, {
      width: '700px',
      disableClose: true,
      data:{id:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.obtenerVisitas();
      }
    });

   
  }
  
  darBajaVisita(visita:IVisita, accion: number){
    console.log(visita);
    this.id=visita.id;
    if (this.id!=undefined) {
      visita.estado=accion;
      this._visitaservice.bajaVisita(this.id,visita).subscribe((r) => {
      this.obtenerVisitas();
    });
    }
  }
}
