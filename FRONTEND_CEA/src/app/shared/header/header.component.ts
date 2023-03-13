import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private usuario:LoginService,private router:Router){}
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
}
