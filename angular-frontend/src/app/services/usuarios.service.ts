import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

export interface Usuario {
  id?: number;
  nombre: string;
  apellidos: string;
  dni: string;
  fechaNacimiento: string;
  sexo: string;
  emailPersonal: string;
  telefonoPersonal: string;
  calle?: string;
  ciudad?: string;
  codigoPostal?: string;
  username: string;
  password: string;
  rol?: string;
  activo?: boolean;
  emailVerificado?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  /**
   * Crea un nuevo usuario
   * @param usuario Datos del usuario a crear
   * @returns Observable con la respuesta del servidor
   */
  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear`, usuario);
  }

  /**
   * Obtiene todos los usuarios
   * @returns Observable con la lista de usuarios
   */
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  /**
   * Obtiene un usuario por su ID
   * @param id ID del usuario a obtener
   * @returns Observable con los datos del usuario
   */
  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  /**
   * Actualiza los datos de un usuario
   * @param id ID del usuario a actualizar
   * @param usuario Datos actualizados del usuario
   * @returns Observable con la respuesta del servidor
   */
  actualizarUsuario(id: number, usuario: Usuario): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, usuario);
  }

  /**
   * Elimina un usuario
   * @param id ID del usuario a eliminar
   * @returns Observable con la respuesta del servidor
   */
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}