

import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { Dialog } from '@angular/cdk/dialog';

import { IRol } from 'src/app/core/interfaces/rol';
import { RolService } from 'src/app/core/services/rol.service';
import { IUsuario } from 'src/app/core/interfaces/usuario';
import { PersonaService } from 'src/app/core/services/persona.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-agregar-editar-usuario',
  templateUrl: './agregar-editar-usuario.component.html',
  styleUrls: ['./agregar-editar-usuario.component.css']
})
export class AgregarEditarUsuarioComponent implements OnInit  {
  datosUsuarios:any={};
  form: FormGroup;
  operacion: string ='Agregar '
  id: number | undefined;
  constructor(public dialogRef: MatDialogRef<AgregarEditarUsuarioComponent>,private rol:RolService,
    private fb: FormBuilder, private UsuarioService: UsuarioService, private PersonaService:PersonaService,@Inject(MAT_DIALOG_DATA) public data: any,
    ){
      
      this.form = this.fb.group({
        nombrePersona:['', Validators.required],
        apellidoPersona:['', Validators.required],
        edad:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        ci:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        celular:['',[Validators.required, Validators.pattern("^[0-9]*$")]],
        nombreUsuario:['', Validators.required],
        contrasenia:['', Validators.required],
        rolid:[],
      });
      this.id = data.id;
    }

  ngOnInit(): void {
    this.listarRoles();
    this.esEditar(this.id)
  }

  esEditar(id:number | undefined){
   if (id !== undefined){
    this.operacion = 'Editar ';
    this.getUsuario(id);
   }
  }

    getUsuario(id: number){
      // console.log(id)
      this.UsuarioService.obtenerUsuario(id).subscribe((data) => {
      this.form.patchValue({
          nombrePersona:data[0].nombrePersona,
          apellidoPersona:data[0].apellidoPersona,
          edad:data[0].edadPersona,
          ci:data[0].ciPersona,
          nombreUsuario:data[0].nombreUsuario,
          rolid:data[0].nombreRol
      })
      console.log(data[0]);
      // console.log(data.persona[nombrePersona]);
      
      })

    }
  listaRoles!: IRol[];

  cancelar(){
    this.dialogRef.close();
    
    };
    hide = false;
  

  listarRoles(){
    this.rol.obtenerRoles().subscribe((resp)=>{
      this.listaRoles=resp;
      // console.log(this.listaRoles);
    })
  }
  
  agregarUsuario(){
    const usuario:IUsuario = {
      nombreUsuario: this.form.value.usuario,
      contraseniaUsuario: this.form.value.contrasenia,
      estadoUsuario: 1,
      RolId: this.form.value.rolid,
      persona: {
        nombrePersona:this.form.value.nombre,
        apellidoPersona: this.form.value.apellido,
        edadPersona: this.form.value.edad,
        ciPersona: this.form.value.ci,
        celularPersona: this.form.value.celular,
        estadoPersona: 1
      }
    }

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Registrado exitosamente'
    })

    

    this.UsuarioService.enviarUsuario(usuario).subscribe(() =>{
      console.log("Usuario Agregado Exitosamente");
      this.dialogRef.close();
    });

  }
  
}
