import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VisitaService } from 'src/app/core/services/visita.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';
MatDialogRef

@Component({
  selector: 'app-reportes-visita',
  templateUrl: './reportes-visita.component.html',
  styleUrls: ['./reportes-visita.component.css']
})
export class ReportesVisitaComponent implements OnInit {
  
  form: FormGroup;
  constructor(  private fb: FormBuilder, private _visitaservice: VisitaService, public dialogRefReporte: MatDialogRef<ReportesVisitaComponent>) {
    this.form=this.fb.group({
      fechaInicio:['',Validators.required],
      fechaFinal:['',Validators.required]
    })
   }


  ngOnInit() {
  }
  cancelar(){
    this.dialogRefReporte.close();
  };

  generarReporte(){
    if(this.form.invalid) {
      return;
    }
    const r:any={
      fechaInicio:this.form.value.fechaInicio.toISOString().slice(0,10),
      fechaFinal:this.form.value.fechaFinal.toISOString().slice(0,10)
    }
    console.log(r);
    this._visitaservice.generarReporte(r).subscribe((data)=>{
      console.log(data);
      // saveAs(data,"dasda.xlsx")
      //  file=data.headers.get('content-disposition')
      // ?.split(';')[1].split('=')[1];
      let blob:Blob=data.body as Blob;
      let a=document.createElement('a');
      a.download="Reporte Institucion";
      a.href=window.URL.createObjectURL(blob);
      a.click();

    });
     this.cancelar(); 
  }
}
