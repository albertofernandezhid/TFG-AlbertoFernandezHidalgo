import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroempresaService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  registrarEmpresa(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/empresa`, data);
  }
}
