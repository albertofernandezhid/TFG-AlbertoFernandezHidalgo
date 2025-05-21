import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EMPRESACrearUsuariosService {
  private apiUrl = 'http://localhost:8000/api/empleados'; // Cambia si tu backend usa otro puerto o subruta

  constructor(private http: HttpClient) {}

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }
}