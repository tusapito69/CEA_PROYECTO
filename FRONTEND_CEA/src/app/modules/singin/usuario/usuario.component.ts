import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { IUsuario } from 'src/app/core/interfaces/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { AgregarEditarUsuarioComponent } from '../agregar-editar-usuario/agregar-editar-usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit,AfterViewInit{
  displayedColumns: string[] = ['id','usuario','rol','nombre','apellido','estado','opciones'];
  constructor(private _usuarioService:UsuarioService,public dialog: MatDialog){}
  private usuarios!:any[];
  dataSource =new MatTableDataSource<any>(this.usuarios);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit():void{
    this.obtenerUsuarios();
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  obtenerUsuarios(){
    this._usuarioService.obtenerUsuarios().subscribe((resp)=>{
      this.dataSource.data=resp;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  agregarEditarUsuario(id?: number){
    console.log(id)
    const dialogRef = this.dialog.open(AgregarEditarUsuarioComponent, {
      width: '550px',
      disableClose: true
    });
  }
}
