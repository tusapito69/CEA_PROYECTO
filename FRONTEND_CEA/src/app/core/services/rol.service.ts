import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRol } from '../interfaces/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private httpClient: HttpClient) { }

  
  obtenerRoles():Observable<any>{
    return this.httpClient.get<IRol>(`${environment.API_URL}/api/Roles`);
  }
}
