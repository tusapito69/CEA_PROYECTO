import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http:HttpClient;
  constructor(private handler: HttpBackend
    
    //private _cookieService: CookieService
    ){
      this.http=new HttpClient(handler)
    }
  // private httpHeaders: HttpHeaders = new HttpHeaders({
  //   'content-type': 'application/json',
  //   // Authorization: `Bearer ${this._cookieService.get('access')}`,
  // });

  enviarUsuario(usuario:Login): Observable<Login>{
    return this.http.post<Login>(`${environment.API_URL}/api/Login`,usuario);
  }
  leerUsuario(){
  
    let usuario=JSON.parse(localStorage.getItem("usuario")||"")
    return usuario;
   
  }
  almacenarUsuario(usuario:any){
    localStorage.setItem("usuario",JSON.stringify(usuario))
  }
  destruirSesion(){
    localStorage.removeItem("usuario");
  }

}
