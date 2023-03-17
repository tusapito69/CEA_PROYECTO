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
  id:number| undefined;
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
      console.log(resp);
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
    const dialogRef = this.dialog.open(AgregarEditarUsuarioComponent, {
      width: '550px',
      disableClose: true,
      data:{id:id}
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.obtenerUsuarios();
    })
  }
  
  darBajaUsuario(us:IUsuario, accion: number){
    this.id=us.idUsuario;
    console.log(us);
    if (this.id!=undefined) {
      us.estadoUsuario=accion;
      // console.log(us.estadoUsuario);
      // console.log(this.id)
      this._usuarioService.bajaUsuario(this.id,us).subscribe((r) => {
        this.obtenerUsuarios();
    });
    }
  }
  
}
