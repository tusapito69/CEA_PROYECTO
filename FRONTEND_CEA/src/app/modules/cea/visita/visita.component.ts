import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { VisitaService } from 'src/app/core/services/visita.service';
import { IVisita } from '../../../core/interfaces/visita';
import { AgregarEditarVisitaComponent } from '../agregar-editar-visita/agregar-editar-visita.component';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.css']
})
export class VisitaComponent implements OnInit {

  displayedColumns:string[]=['Id','Actividad','Fecha','Lugar','Observaciones', 'Tipo', 'Estado', 'Opciones'];
  private visitas!:IVisita[];
  dataSource =new MatTableDataSource<IVisita>(this.visitas);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _visitaservice:VisitaService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerVisitas();
  }
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  //LISTAR VISITAS
    obtenerVisitas(){
      this._visitaservice.obtenerVisitas().subscribe((resp:IVisita[])=>{
        console.log(resp);
        this.dataSource.data=resp;
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
  AgregarEditarVisita(){
    const dialogRef = this.dialog.open(AgregarEditarVisitaComponent, {
      width: '550px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
