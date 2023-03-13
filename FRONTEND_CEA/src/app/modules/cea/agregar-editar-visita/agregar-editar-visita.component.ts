import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IVisita } from '../../../core/interfaces/visita';
import { VisitaService } from '../../../core/services/visita.service';
import { InstitucionService } from '../../../core/services/institucion.service';
import { PersonaService } from '../../../core/services/persona.service';

@Component({
  selector: 'app-agregar-editar-visita',
  templateUrl: './agregar-editar-visita.component.html',
  styleUrls: ['./agregar-editar-visita.component.css']
})
export class AgregarEditarVisitaComponent implements OnInit {
  ListaPersona: any[] = [];
  ListaInstitucion: any[] = [];
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<AgregarEditarVisitaComponent>, private fb: FormBuilder,
    private _visitaService: VisitaService, private _institucionService: InstitucionService, private _personaService: PersonaService) { 
    this.form = this.fb.group({
      actividad: ['', [Validators.required, Validators.maxLength(30)]],
      lugar: ['', Validators.required],
      observaciones: ['', Validators.required],
      tipo: ['', Validators.required],
      fecha: [null, Validators.required],
      InstitucionId: ['', [Validators.required]],
      PersonaId: ['', [Validators.required]]
    })
  }

  ngOnInit():void {
    this.obtenerVisitas();
  }

  obtenerVisitas(){
    this._institucionService.obtenerInstituciones().subscribe((data)=>{
      this.ListaInstitucion = data;
    })
    this._personaService.obtenerPersona().subscribe((data)=>{
      this.ListaPersona = data;
    })
  };

  cancelar() {
    this.dialogRef.close();
  }

  agregarVisita() {

    if(this.form.invalid) {
      return;
    }

    const visita: IVisita = {
      actividad: this.form.value.actividad,
      fecha: this.form.value.fecha,
      lugar: this.form.value.lugar,
      observaciones: this.form.value.observaciones,
      tipo: this.form.value.tipo,
      estado: 1,
      InstitucionId: this.form.value.Institucion,
      PersonaId: this.form.value.Persona,
      
    };
    this._visitaService.enviarVisitas(visita).subscribe(() => {
      console.log("visita agregada con exito");
    })
  }

}
