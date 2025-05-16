// src/app/services/empleados.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private apiUrl = '/api/empleados';

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { withCredentials: true });
  }
}