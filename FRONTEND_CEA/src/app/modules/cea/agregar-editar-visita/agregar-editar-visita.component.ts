import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IVisita } from '../../../core/interfaces/visita';
import { VisitaService } from '../../../core/services/visita.service';
import { InstitucionService } from '../../../core/services/institucion.service';
import { PersonaService } from '../../../core/services/persona.service';
import { DateAdapter } from '@angular/material/core';
import { IPersona } from '../../../core/interfaces/persona';
import { Institucion } from '../../../core/interfaces/institucion';

@Component({
  selector: 'app-agregar-editar-visita',
  templateUrl: './agregar-editar-visita.component.html',
  styleUrls: ['./agregar-editar-visita.component.css']
})
export class AgregarEditarVisitaComponent implements OnInit {
  ListaPersona!: IPersona[];
  ListaInstitucion!: Institucion[];
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<AgregarEditarVisitaComponent>, private fb: FormBuilder,
    private _visitaService: VisitaService, private _institucionService: InstitucionService, private _personaService: PersonaService,
    private dateAdapter: DateAdapter<any>) { 
    this.form = this.fb.group({
      actividad: ['', [Validators.required, Validators.maxLength(30)]],
      lugar: ['', Validators.required],
      observaciones: ['', Validators.required],
      tipo: ['', Validators.required],
      fecha: [null, Validators.required],
      InstitucionId: [],
      PersonaId: []
    })
    dateAdapter.setLocale('es')
  }

  ngOnInit():void {
    this.obtenerInstitucion();
    this.obtenerPersona();
  }

  obtenerInstitucion(){
    this._institucionService.obtenerInstituciones().subscribe((data)=>{
      this.ListaInstitucion = data;
    })
  };
  obtenerPersona(){
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
      fecha: this.form.value.fecha.toISOString().slice(0,10),
      lugar: this.form.value.lugar,
      observaciones: this.form.value.observaciones,
      tipo: this.form.value.tipo,
      InstitucionId: this.form.value.InstitucionId,
      PersonaId: this.form.value.PersonaId,
      estado: 1,
      
    }
    console.log(visita.fecha)

    this._visitaService.enviarVisitas(visita).subscribe((resp) => {
      console.log("visita agregada con exito");
      console.log(resp);
    })
  }

}
