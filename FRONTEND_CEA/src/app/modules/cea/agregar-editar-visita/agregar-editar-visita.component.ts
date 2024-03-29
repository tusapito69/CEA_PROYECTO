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
import { filter } from 'rxjs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-agregar-editar-visita',
  templateUrl: './agregar-editar-visita.component.html',
  styleUrls: ['./agregar-editar-visita.component.css']
})
export class AgregarEditarVisitaComponent implements OnInit {
  selectinst!: string;
  ListaTipo: string[] = ['Reunion', 'Taller', 'Recorrido','Exterior']
  seleccionada!: string;
  operacion: string = 'Agregar ';
  id: number | undefined;
  form: FormGroup;
  texto!:string;
  opcionSeleccionada = "";
  ListaInstitucion!: Institucion[];
  existe:any;
  dataInstitucion!:Institucion[];
  constructor(public dialogRef: MatDialogRef<AgregarEditarVisitaComponent>, private fb: FormBuilder,
    private _visitaService: VisitaService, private institucion: InstitucionService, private _personaService: PersonaService,
    private dateAdapter: DateAdapter<any>, @Inject(MAT_DIALOG_DATA) public data:any,
    public dialog: MatDialog,
    private _alertaService:AlertaService) {
    this.form = this.fb.group({
      actividad: ['', [Validators.required, Validators.maxLength(1000)]],
      lugar: ['', Validators.required],
      observaciones: [''],
      tipo: ['', Validators.required],
      email: ['',[ Validators.email]],
      barrio_zona:[''],
      fecha: ['', [Validators.required]],
      InstitucionId: [],
      nombrePersona: ['', Validators.required],
      apellidoPersona: ['', Validators.required],
      edadPersona: ['',Validators.pattern("^[0-9]*$")],
      ciPersona: ['',[Validators.maxLength(11)]],
      genero: ['',[Validators.maxLength(1),Validators.required]],
      celularPersona: ['',[Validators.maxLength(17),Validators.pattern("^[0-9+-]*$")]],
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
    this._visitaService.obtenerVisita(id).subscribe(data => {
      this.form.patchValue({
        actividad: data[0].actividad,
        lugar: data[0].lugar,
        observaciones: data[0].observaciones,
        tipo: data[0].tipo,
        fecha: data[0].fecha,
        nombrePersona: data[0].persona["nombrePersona"],
        apellidoPersona: data[0].persona["apellidoPersona"],
        edadPersona: data[0].persona["edadPersona"],
        ciPersona: data[0].persona["ciPersona"],
        genero: data[0].persona["genero"],
        celularPersona: data[0].persona["celularPersona"],
        barrio_zona:data[0].persona["barrio_zona"],
        email: data[0].persona["email"],
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
      this.dataInstitucion=data;
    })
  };

  dataInsti=this.ListaInstitucion;
  cancelar() {
      this.dialogRef.close(false);
  }

  agregarVisita() {
    if(this.form.invalid) {
      return;
    }
    const visita: IVisita = {
      actividad: this.form.value.actividad,
      observaciones: this.form.value.observaciones,
      tipo: this.form.value.tipo,
      estado: 1,
      InstitucionId: this.form.value.InstitucionId,
      persona: {
        nombrePersona:this.form.value.nombrePersona,
        apellidoPersona: this.form.value.apellidoPersona,
        edadPersona: this.form.value.edadPersona,
        ciPersona: this.form.value.ciPersona,
        genero: this.form.value.genero,
        celularPersona: this.form.value.celularPersona,
        email: this.form.value.email,
        barrio_zona:this.form.value.barrio_zona,
        estadoPersona: 1
      }

    }
    if (this.id == undefined) {
      console.log(visita)
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


  seleccionarInstitucion(event:Event){
    const resul=(event.target as HTMLInputElement).value;
    if (resul==='') {
        this.dataInstitucion=this.ListaInstitucion;
    }
    this.dataInstitucion=this.dataInstitucion.filter(x=>x.nombre.toLowerCase().includes(resul.toLowerCase()));
    if (this.dataInstitucion[0].id == undefined) {
      console.log(this.dataInstitucion);
      this.form.value.InstitucionId = this.dataInstitucion[0].id;
    }
  }
  idSelect(idInst:any){
    this.form.value.InstitucionId=idInst;
  }
}
