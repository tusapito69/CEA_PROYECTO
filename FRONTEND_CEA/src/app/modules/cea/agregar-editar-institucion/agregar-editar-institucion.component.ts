import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { Dialog } from '@angular/cdk/dialog';
import { InstitucionService } from 'src/app/core/services/institucion.service';
import { Institucion } from 'src/app/core/interfaces/institucion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-editar-institucion',
  templateUrl: './agregar-editar-institucion.component.html',
  styleUrls: ['./agregar-editar-institucion.component.css']
})
export class AgregarEditarInstitucionComponent implements OnInit {
  institutions: string[] = ['Unidad Educativa', 'Institucion'];
  hide = true;
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<AgregarEditarInstitucionComponent>,
    private fb: FormBuilder, private _institucion: InstitucionService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required]
    });
  }
  ngOnInit(): void {

  }
  addEditarInstitucion() {
    if (this.form.invalid) {
      return;
    }
    const institucion: Institucion = {
      Nombre: this.form.value.nombre,
      Tipo: this.form.value.tipo,
      Estado: 1
    };
    this._institucion.agregarInstitucion(institucion).subscribe((resp) => {
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
        icon: 'success',
        title: 'Institucion Agregada con Exito'
      })
      this.dialogRef.close(true);
    }, (e) => {
      console.log(e.error)
    });



  }
  cancelar() {
    this.dialogRef.close(false);
  };
}
