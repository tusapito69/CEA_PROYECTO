import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/interfaces/login';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  public form!: FormGroup;
  datos:any={}
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private route: Router,){
      this.form = this.fb.group({
        userName: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  ngOnInit(): void {}


  loguear():void{
    const usuario:Login = this.form.value;
    this.loginService.enviarUsuario(usuario).subscribe(
      (resp) => {
        this.datos=resp;
        localStorage.setItem("user",JSON.stringify(this.datos["tok"]));
        this.route.navigate(['/cea/institucion']);
      },
      (e)=>{
        console.log(e.error);
      }
    );
  }
}
