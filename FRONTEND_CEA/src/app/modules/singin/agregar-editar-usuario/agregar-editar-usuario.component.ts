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
import { AlertaService } from 'src/app/core/services/alerta.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-agregar-editar-usuario',
  templateUrl: './agregar-editar-usuario.component.html',
  styleUrls: ['./agregar-editar-usuario.component.css']
})
export class AgregarEditarUsuarioComponent implements OnInit  {
  // hide = true;
  datosUsuarios:any={};
  form: FormGroup;
  operacion: string ='Agregar '
  id: number | undefined;
  sel:any;
  constructor(public dialogRef: MatDialogRef<AgregarEditarUsuarioComponent>,private rol:RolService,
    private fb: FormBuilder, 
    private UsuarioService: UsuarioService,
    private PersonaService:PersonaService,
    private _alertaService:AlertaService,
    @Inject(MAT_DIALOG_DATA) public data: any,){
      this.form = this.propUsuario();
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
      this.UsuarioService.obtenerUsuario(id).subscribe((data) => {
     
      this.form.patchValue({
          nombrePersona:data[0].persona["nombrePersona"],
          apellidoPersona:data[0].persona["apellidoPersona"],
          edad:data[0].persona["edadPersona"],
          ci:data[0].persona["ciPersona"],
          celular:data[0].persona["celularPersona"],
          nombreUsuario:data[0].nombreUsuario,
          contrasenia:data[0].contraseniaUsuario,
          rolid:data[0].rol["id"]
      })
      })
    }
  listaRoles!: IRol[];
  cancelar(){
    this.dialogRef.close();
  };

  listarRoles(){
    this.rol.obtenerRoles().subscribe((resp)=>{
      this.listaRoles=resp;
    })
  }
  
  agregarUsuario(){
    if (this.form.invalid) {
      return;
    }
    const usuario:IUsuario = {
      nombreUsuario: this.form.value.nombreUsuario,
      contraseniaUsuario: this.form.value.contrasenia,
      estadoUsuario: 1,
      rolId: this.form.value.rolid,
      persona: {
        nombrePersona:this.form.value.nombrePersona,
        apellidoPersona: this.form.value.apellidoPersona,
        edadPersona: this.form.value.edad,
        ciPersona: this.form.value.ci,
        celularPersona: this.form.value.celular,
        estadoPersona: 1
      }
    }
    if (this.id==undefined) {
      this.UsuarioService.enviarUsuario(usuario).subscribe(() =>{
        this._alertaService.mensajeAgregar("Usuario agregado");
        Swal.fire(
          'Se ha agregado el usuario correctamente',
          '',
          'success'
        )
      });
      this.dialogRef.close();
      
    }else{

      usuario.persona.id=this.id,
      this.UsuarioService.modificarUsuario(this.id,usuario).subscribe(r=>{
        this._alertaService.mensajeAgregar("Usuario modificado");
      });
      this.dialogRef.close(true);
    }
   
  }

  propUsuario(){
    return this.fb.group({
      nombrePersona:['', Validators.required],
      apellidoPersona:['', Validators.required],
      edad:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      ci:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      celular:['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      nombreUsuario:['', Validators.required],
      contrasenia:['', Validators.required],
      rolid:['', Validators.required],
    });
  }
  
}
