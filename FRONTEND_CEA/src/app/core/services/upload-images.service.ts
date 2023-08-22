import { Injectable } from '@angular/core';
import { HttpClient,HttpEvent,HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  constructor(private httpclient: HttpClient)  {
  }

  upload(file: File): Observable<HttpEvent<any{
    const formData: FormData = new FormData();
    formData.append('files', file);

    return this.httpclient.post<any>(`${environment.API_URL}/api/images`);
  }
}
