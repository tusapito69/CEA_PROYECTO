import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  user!:string;
  constructor(private usuario:LoginService,private router:Router){}
  ngOnInit(): void {
  this.GetUsuario();  
  }
  CerrarSesion(){
    Swal.fire({
      title: '¿Desea cerrar sesion?',
      showDenyButton: true,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancelar`,
    }).then((result)=>{
      if(result.isConfirmed){
        this.usuario.destruirSesion();
        this.router.navigate(['login']);
      }
    })
   
  }
  GetUsuario(){
    this.usuario.getUsuario().subscribe(a => {
      console.log(a);
    });
    
  }
}
