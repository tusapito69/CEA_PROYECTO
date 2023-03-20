import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { VisitaService } from 'src/app/core/services/visita.service';
import { IVisita } from '../../../core/interfaces/visita';
import { AgregarEditarVisitaComponent } from '../agregar-editar-visita/agregar-editar-visita.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.css']
})
export class VisitaComponent implements OnInit {
  id:number| undefined;
  displayedColumns:string[]=['Id','Actividad','Fecha','Lugar','Observaciones', 'Tipo', 'Estado', 'Opciones'];
  private visitas!:IVisita[];
  form:FormGroup;
  dataSource =new MatTableDataSource<IVisita>(this.visitas);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private fb: FormBuilder,
    private _visitaservice:VisitaService,public dialog: MatDialog) { 
      this.form=this.fb.group({
        fechaInicio:['',Validators.required],
        fechaFinal:['',Validators.required]
      })
    }

  ngOnInit(): void {
    this.obtenerVisitas();
  }
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  //LISTAR VISITAS
    obtenerVisitas(){
      this._visitaservice.obtenerVisitas().subscribe((resp:IVisita[])=>{
        this.dataSource.data=resp;
      })
    };
  //BUSCADOR
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  AgregarEditarVisita(id?:number){
    const dialogRef = this.dialog.open(AgregarEditarVisitaComponent, {
      width: '700px',
      disableClose: true,
      data:{id:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.obtenerVisitas();
      }
    });

   
  }
  generarReporte(){
    if(this.form.invalid) {
      return;
    }
    const r:any={
      fechaInicio:this.form.value.fechaInicio.toISOString().slice(0,10),
      fechaFinal:this.form.value.fechaFinal.toISOString().slice(0,10)
    }
    console.log(r.fechaInicio);
    this._visitaservice.generarReporte(r).subscribe((data)=>{
      console.log(data);
        // const blob=new Blob([r],{ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
      // saveAs(data,"dasda.xlsx")
      //  file=data.headers.get('content-disposition')
      // ?.split(';')[1].split('=')[1];
      let blob:Blob=data.body as Blob;
      let a=document.createElement('a');
      a.download="Reporte Institucion";
      a.href=window.URL.createObjectURL(blob);
      a.click();

    });
      
  }
}
