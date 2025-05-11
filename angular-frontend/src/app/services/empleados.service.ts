// src/app/services/empleados.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private apiUrl = 'http://localhost:8000/api/empleados'; // Ajusta la URL a tu API

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
