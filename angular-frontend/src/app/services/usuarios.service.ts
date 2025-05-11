// src/app/services/usuarios.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private apiUrl = 'http://localhost:8000/api/usuarios'; // Ajusta el puerto si usas otro

  constructor(private http: HttpClient) {}

  crearUsuario(usuario: any) {
    return this.http.post(this.apiUrl, usuario);
  }
}
