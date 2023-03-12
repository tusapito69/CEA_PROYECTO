import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  constructor(private httpclient:HttpClient) { }
  obtenerVisitas():Observable<any>{
    return this.httpclient.get<any>(`${environment.API_URL}/api/Visits`);
  }

}
