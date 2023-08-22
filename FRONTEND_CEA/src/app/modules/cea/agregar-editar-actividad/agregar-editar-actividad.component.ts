import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActividadService } from 'src/app/core/services/actividad.service';
import { AlertaService } from 'src/app/core/services/alerta.service';
import { IActividad } from 'src/app/core/interfaces/actividad';
@Component({
  selector: 'app-agregar-editar-actividad',
  templateUrl: './agregar-editar-actividad.component.html',
  styleUrls: ['./agregar-editar-actividad.component.css']
})
export class AgregarEditarActividadComponent implements OnInit {
  operacion:string='Agregar ';
  hide = true;
  id:number|undefined;

  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<AgregarEditarActividadComponent>,
    private fb: FormBuilder, private _actividad: ActividadService,
    private _alertaservice:AlertaService,
    @Inject(MAT_DIALOG_DATA) public data:any) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      lugar: ['', Validators.required]
    });
    this.id=data.id;
  }
  ngOnInit(): void {
    this.esEditar(this.id);
  }
  esEditar(id?:number){
    if (id!==undefined) {
      this.operacion="Editar ";
      this.obtenerActividad(id);
    }
  }

  obtenerActividad(id:number){
    this._actividad.obtenerActividad(id).subscribe(data=>{
        this.form.patchValue({
          nombre:data.nombre,
          descripcion:data.descripcion,
          fecha:data.fecha,
          lugar:data.lugar
        })
    })
  }

  addEditarActividad() {
    if (this.form.invalid) {
      return;
    }
    const actividad: IActividad = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      fecha: this.form.value.fecha,
      lugar: this.form.value.lugar,
      estado: 1
    };
    if (this.id==undefined) {
      this._actividad.agregarActividad(actividad).subscribe((resp) => {
        this._alertaservice.mensajeAgregar("Acticvidad agregada");
      }, (e) => {
        console.log(e.error)
      });
    }else{
      this._actividad.editarActividad(this.id,actividad).subscribe(r=>{
        this._alertaservice.mensajeAgregar("Actividad modificada");
      });
    }
    this.dialogRef.close(true);
  };

  cancelar() {
    this.dialogRef.close(false);
  };
}
