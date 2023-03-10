import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

constructor(private httpclient: HttpClient) { }

  obtenerPersona():Observable<any>{
    return this.httpclient.get<any>(`${environment.API_URL}/api/Users`);
  }

  // enviarUsuario(usuario:IUsuario):Observable<any>{
  //   return this.httpclient.post(`${environment.API_URL}/api/Users`,usuario);
  // }
  // modificarUsuario(id:number,usuario:IUsuario):Observable<any>{
  //   return this.httpclient.put(`${environment.API_URL}/api/Users/${id}`,usuario)
  // }
}
