import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/interfaces/login';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public form!: FormGroup;
  datos: any = {}
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private route: Router,) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void { }


  loguear(): void {
    const usuario: Login = this.form.value;
    this.loginService.enviarUsuario(usuario).subscribe(
      (resp) => {
        this.datos = resp;
        this.loginService.almacenarUsuario(this.datos['tok'])
        this.route.navigate(['/cea/institucion']);
      },
      (event:HttpErrorResponse) => {
        console.log(event.error.msg)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'error',
          title: event.error['er']
        })
        this.form.reset();
      }
    );
   
  }


}
