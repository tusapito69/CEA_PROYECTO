import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient,
   
    //private _cookieService: CookieService
    ){}
  // private httpHeaders: HttpHeaders = new HttpHeaders({
  //   'content-type': 'application/json',
  //   // Authorization: `Bearer ${this._cookieService.get('access')}`,
  // });

  enviarUsuario(usuario:Login): Observable<Login>{
    return this.httpClient.post<Login>(`${environment.API_URL}/api/Login`,usuario);
  }
}
