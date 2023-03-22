import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IVisita } from '../../../core/interfaces/visita';
import { VisitaService } from '../../../core/services/visita.service';
import { InstitucionService } from '../../../core/services/institucion.service';
import { PersonaService } from '../../../core/services/persona.service';
import { DateAdapter } from '@angular/material/core';
import { IPersona } from '../../../core/interfaces/persona';
import { Institucion } from '../../../core/interfaces/institucion';
import { InstitucionComponent } from '../institucion/institucion.component';
import { AlertaService } from 'src/app/core/services/alerta.service';

@Component({
  selector: 'app-agregar-editar-visita',
  templateUrl: './agregar-editar-visita.component.html',
  styleUrls: ['./agregar-editar-visita.component.css']
})
export class AgregarEditarVisitaComponent implements OnInit {
  ListaTipo: string[] = ['Reunion', 'Taller', 'Recorrido']
  seleccionada!: string;
  operacion: string = 'Agregar ';
  id: number | undefined;
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<AgregarEditarVisitaComponent>, private fb: FormBuilder,
    private _visitaService: VisitaService, private institucion: InstitucionService, private _personaService: PersonaService,
    private dateAdapter: DateAdapter<any>, @Inject(MAT_DIALOG_DATA) public data:any,
    public dialog: MatDialog,
    private _alertaService:AlertaService) { 
    this.form = this.fb.group({
      actividad: ['', [Validators.required, Validators.maxLength(100)]],
      lugar: ['', Validators.required],
      observaciones: ['', [Validators.required, Validators.maxLength(250)] ],
      tipo: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      fecha: ['', [Validators.required]],
      InstitucionId: ['',Validators.required],
      nombrePersona: ['', Validators.required],
      apellidoPersona: ['', Validators.required],
      edadPersona: ['',[Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(110)]],
      ciPersona: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(11)]],
      celularPersona: ['',[Validators.required, Validators.pattern("^[0-9]*$"),Validators.maxLength(11)]],
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
        email: data[0].email,
        nombrePersona: data[0].persona["nombrePersona"],
        apellidoPersona: data[0].persona["apellidoPersona"],
        edadPersona: data[0].persona["edadPersona"],
        ciPersona: data[0].persona["ciPersona"],
        celularPersona: data[0].persona["celularPersona"],
        InstitucionId: data[0].institucion["id"]
      })
      this.seleccionada = data[0].institucion["id"];
      console.log(data[0].institucion["id"]);
      console.log(this.seleccionada);
    })
  }

  obtenerInstitucion(){
    this.institucion.obtenerActivos().subscribe((data)=>{
      this.ListaInstitucion = data;
    })
  };
  

  ListaInstitucion!: Institucion[];
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
      email: this.form.value.email,
      estado: 1,
      InstitucionId: this.form.value.InstitucionId,
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
        this._alertaService.mensajeAgregar("Visita Agregada");
        
        this.dialogRef.close(true);
      })
    } else {
      //EDITAR
      this._visitaService.modificarVisitas(this.id, visita).subscribe(data => {
        this._alertaService.mensajeAgregar("Visita Modificada");
        this.dialogRef.close(true);
      })
    }
    
  }

  AgregarInstitucion(){
    const dialogRef = this.dialog.open(InstitucionComponent, {
      width: '700px',
      disableClose: true
    });
  }

}
