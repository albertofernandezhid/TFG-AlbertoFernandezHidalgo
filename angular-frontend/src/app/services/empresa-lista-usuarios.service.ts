import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Empleado {
  id: number;
  nombre: string;
  apellidos: string;
  activo: boolean;
  // otros campos que pueda tener el empleado
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class EMPRESAListaUsuariosService {
  private apiUrl = 'http://localhost:8000/usuarios';

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<Empleado[]> {
  return this.http.get<Empleado[]>(this.apiUrl).pipe(
    map(empleados => empleados.map(e => {
      let activo = false;
      const val = e.activo as any;

      if (typeof val === 'boolean') {
        activo = val;
      } else if (typeof val === 'string') {
        activo = val.toLowerCase() === 'true' || val === '1';
      } else if (typeof val === 'number') {
        activo = val === 1;
      }
      return { ...e, activo };
    }))
  );
}

  actualizarEstadoActivo(id: number, activo: boolean): Observable<any> {
    const url = `${this.apiUrl}/${id}/activo`;
    return this.http.patch(url, { activo });
  }
}
