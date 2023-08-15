import { AfterViewInit, Component, OnInit } from '@angular/core';
import { InstitucionService } from 'src/app/core/services/institucion.service';
import { LoginService } from 'src/app/core/services/login.service';
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
  cantidadExteriores!:any;
  cantidadRecorridos!:any;
  cantidadReuniones!:any;
  cantidadTalleres!:any;
  user:any={};
  constructor(private _visitaService:VisitaService,
    private _institucionService:InstitucionService,
    private _usuarioService:UsuarioService,
    private _loginService:LoginService) { }

  ngOnInit() {
    this.totVisitas();
    this.totInstitucion();
    this.totUsuarios();
    this.totVisitaExteriores();
    this.totVisitaRecorridos();
    this.totVisitaReuniones();
    this.totVisitaTalleres();
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
    return this._loginService.getUsuario().subscribe(a=>{
      this.user=a;
      if(this.user.rol=="Administrador"){
        this._usuarioService.obtenerTotal().subscribe(resp=>{
          this.cantidadUsuarios=resp;
        })
      }
    })
  }
  totVisitaExteriores(){
    this._visitaService.obtenerTotalExteriores().subscribe((resp)=>{
     this.cantidadExteriores=resp;
    });
  }
  totVisitaRecorridos(){
    this._visitaService.obtenerTotalRecorridos().subscribe((resp)=>{
     this.cantidadRecorridos=resp;
    });
  }
  totVisitaReuniones(){
    this._visitaService.obtenerTotalReuniones().subscribe((resp)=>{
     this.cantidadReuniones=resp;
    });
  }
  totVisitaTalleres(){
    this._visitaService.obtenerTotalTalleres().subscribe((resp)=>{
     this.cantidadTalleres=resp;
    });
  }
}
