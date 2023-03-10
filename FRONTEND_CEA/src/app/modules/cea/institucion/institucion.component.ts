import {AfterViewInit,Component, OnInit,ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


import { Institucion } from 'src/app/core/interfaces/institucion';
import { InstitucionService } from 'src/app/core/services/institucion.service';
import { AgregarEditarInstitucionComponent } from '../agregar-editar-institucion/agregar-editar-institucion.component';
@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.css']
})
export class InstitucionComponent implements OnInit,AfterViewInit{
 
  displayedColumns:string[]=['id','nombre','tipo','estado','opciones'];
  private instituciones!:Institucion[];
  dataSource =new MatTableDataSource<Institucion>(this.instituciones);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _institucionservice:InstitucionService,public dialog: MatDialog){}
  ngOnInit(): void {
    this.obtenerInstituciones();
  }
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  agregarEditarInstitucion(){
    const dialogRef = this.dialog.open(AgregarEditarInstitucionComponent, {
      width: '550px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.obtenerInstituciones();
    })
  }
  obtenerInstituciones(){
    this._institucionservice.obtenerInstituciones().subscribe((resp)=>{
      this.dataSource.data=resp;
      console.log(this.dataSource.data);
    })
   
  };
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  darBajaInstitucion(id: number, accion: number){
    this._institucionservice.editarInstitucion(id,accion).subscribe((r) => {
      this.obtenerInstituciones();
    });
  }
  modificarInstitucion(inst:any){

  }
}
