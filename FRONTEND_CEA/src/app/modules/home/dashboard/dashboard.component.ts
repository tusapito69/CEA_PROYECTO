import { AfterViewInit, Component, OnInit } from '@angular/core';
import { InstitucionService } from 'src/app/core/services/institucion.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { VisitaService } from 'src/app/core/services/visita.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit{
  cantidadInstituciones!:any;
  cantidadVisitas!:any;
  cantidadUsuarios!:any;
  
  constructor(private _visitaService:VisitaService,
    private _institucionService:InstitucionService,
    private _usuarioService:UsuarioService) { }

  ngOnInit() {
    this.totVisitas();
    this.totInstitucion();
    this.totUsuarios();
  }
  ngAfterViewInit(): void {
    
  }
  totVisitas(){
    this._visitaService.obtenerTotal().subscribe((resp)=>{
     this.cantidadVisitas=resp;
    });
  }
  totInstitucion(){
    this._institucionService.obtenerTotal().subscribe(resp=>{
      this.cantidadInstituciones=resp;
    })
  }
  totUsuarios(){
    this._usuarioService.obtenerTotal().subscribe(resp=>{
      this.cantidadUsuarios=resp;
    })
  }
}
