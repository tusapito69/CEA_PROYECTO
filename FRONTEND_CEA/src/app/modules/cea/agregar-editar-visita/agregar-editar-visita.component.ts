import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  ListaInstitucion!: Institucion[];
  operacion: string = 'Agregar ';
  id: number | undefined;
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<AgregarEditarVisitaComponent>, private fb: FormBuilder,
    private _visitaService: VisitaService, private institucion: InstitucionService, private _personaService: PersonaService,
    private dateAdapter: DateAdapter<any>, @Inject(MAT_DIALOG_DATA) public data:any) { 
    this.form = this.fb.group({
      actividad: ['', [Validators.required, Validators.maxLength(30)]],
      lugar: ['', Validators.required],
      observaciones: ['', Validators.required],
      tipo: ['', Validators.required],
      fecha: [null, Validators.required],
      InstitucionId: [],
      nombrePersona: ['', Validators.required],
      apellidoPersona: ['', Validators.required],
      edadPersona: ['', Validators.required],
      ciPersona: ['', Validators.required],
      celularPersona: ['', Validators.required],
    })
    this.id = data.id;
    dateAdapter.setLocale('es')
  }

  ngOnInit():void {
    this.obtenerInstitucion();

    this.esEditar(this.id);
  }
  
  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = "Editar";
      this.getVisita(id);
    }
  }

  getVisita(id: number){
    console.log(id);
    this._visitaService.obtenerVisita(id).subscribe(data => {
      this.form.patchValue({
        actividad: data[0].actividad,
        lugar: data[0].lugar,
        observaciones: data[0].observaciones,
        tipo: data[0].tipo,
        fecha: data[0].fecha,
        InstitucionId: data[0].institucion["nombre"],
        nombrePersona: data[0].persona["nombrePersona"],
        apellidoPersona: data[0].persona["apellidoPersona"],
        edadPersona: data[0].persona["edadPersona"],
        ciPersona: data[0].persona["ciPersona"],
        celularPersona: data[0].persona["celularPersona"]
      })
      console.log(data);
    })
  }

  obtenerInstitucion(){
    this.institucion.obtenerInstituciones().subscribe((data)=>{
      this.ListaInstitucion = data;
   
    })
  };

  cancelar() {
    this.dialogRef.close(false);
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
      InstitucionId: this.form.value.institucion,
      estado: 1,
      persona: {
        nombrePersona:this.form.value.nombrePersona,
        apellidoPersona: this.form.value.apellidoPersona,
        edadPersona: this.form.value.edadPersona,
        ciPersona: this.form.value.ciPersona,
        celularPersona: this.form.value.celularPersona,
        estadoPersona: 1
      }
      
    }
    console.log(visita);

    if (this.id == undefined) {
      //AGREGAR
      this._visitaService.enviarVisitas(visita).subscribe((resp) => {
        this.dialogRef.close(true);
        console.log("visita agregada con exito");
      })
    } else {
      //EDITAR
      this._visitaService.modificarVisitas(this.id, visita).subscribe(data => {
        this.dialogRef.close(true);
        console.log("visita actualizada con exito");
      })
    }
    
  }

}
