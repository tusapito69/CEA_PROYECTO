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
import { DialogDetailVisitComponent } from './dialog-detail-visit/dialog-detail-visit.component';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.css']
})
export class VisitaComponent implements OnInit {
  id:number| undefined;
  displayedColumns:string[]=['Id','Nombre','Apellido','Edad','CI','Celular','Institucion','Tipo', 'Estado', 'Opciones'];
  private visitas!:IVisita[];
  private datos!:IVisita[];
  private visi!:IVisita[];
  dataSource =new MatTableDataSource<IVisita>(this.visitas);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _visitaservice:VisitaService,public dialog: MatDialog, public dialogReporte:MatDialog,public dialog1: MatDialog) {
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
        this.datos=resp;
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

  openDialogDetail(visita?:IVisita) {
    const dialogRef = this.dialog1.open(DialogDetailVisitComponent,{

      width: '60%',
      disableClose: false,
      data:{visita:visita},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  AgregarEditarVisita(id?:number){
    const dialogRef = this.dialog.open(AgregarEditarVisitaComponent, {
      width: '60%',
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
  dataVisita(e:any){
    this.dataSource.data=this.datos.filter(x=>x.tipo==e.target.value);
    console.log(e.target.value)
    e.target.value="";
    console.log(e.target.value)
  }

  dataLimpiar(e:any){
    this.dataSource.data=this.datos;
    console.log(this.dataSource.data)
  }

}
