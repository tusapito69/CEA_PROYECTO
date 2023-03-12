import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { VisitaService } from 'src/app/core/services/visita.service';
import { Visita } from '../../../core/interfaces/visita';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.css']
})
export class VisitaComponent implements OnInit {

  displayedColumns:string[]=['Id','Actividad','Fecha','Lugar','Observaciones', 'Tipo', 'Estado'];
  private visitas!:Visita[];
  dataSource =new MatTableDataSource<Visita>(this.visitas);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _visitaservice:VisitaService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerVisitas();
  }
  //LISTAR VISITAS
  obtenerVisitas(){
    this._visitaservice.obtenerVisitas().subscribe((resp:Visita[])=>{
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
}
