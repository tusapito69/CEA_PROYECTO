
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Institucion } from '../interfaces/institucion';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {
  private ruta:string="/api/Institucion";
  // headers=new Headers();
  usuario!:any;

  
  // HttpInterceptor {

  //   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //     request = this.addHeaders(request);
  //     return next.handle(request)
  //   }
  // private httpHeaders: HttpHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: `Bearer ${this._loginservice.leerUsuario()}}`,
  // });
  constructor(private httpclient:HttpClient,private _loginservice:LoginService,) {}

  //  addHeaders(request: HttpRequest<any>) {
  //   let token: string | null = '';
  //   token = localStorage.getItem('platzi_token');
  //   if (token) {
  //     return request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //   } else {
  //     return request;
  //   }

 
  obtenerInstituciones():Observable <any>{
    return this.httpclient.get<any>(`${environment.API_URL}/api/Institucion`);
   
  }
  agregarInstitucion(institucion:Institucion):Observable<Institucion>{
    return this.httpclient.post<Institucion>(`${environment.API_URL}/api/Institucion`,institucion);
  }
  editarInstitucion(id:number,institucion:Institucion):Observable<any>{
    return this.httpclient.put<any>(`${environment.API_URL}${this.ruta}/${id}`,institucion);
  }
  obtenerInstitucion(id:number):Observable<any>{
    return this.httpclient.get<any>(`${environment.API_URL}${this.ruta}/${id}`,
    );
  }
}
