import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EMPLEADOFichajesService {
  private apiUrl = `${environment.apiUrl}/fichajes`;

  constructor(private http: HttpClient) {}

  registrarEntrada(data: {
    usuario_id: number;
    usarFechaHoraActual: boolean;
    fecha?: string;
    hora_entrada?: string;
    lugar?: string;
  }): Observable<any> {
    const payload: any = {
      usuario_id: data.usuario_id,
      tipo: 'entrada',
      usarFechaHoraActual: data.usarFechaHoraActual
    };

    // Solo enviar fecha y hora si no se usa la actual
    if (!data.usarFechaHoraActual) {
      payload.fecha = data.fecha;
      payload.hora_entrada = data.hora_entrada;
    }

    // Lugar es opcional para entrada
    if (data.lugar) {
      payload.lugar = data.lugar;
    }

    console.log('Enviando datos de entrada:', payload);
    return this.http.post(this.apiUrl, payload);
  }

  registrarSalida(data: {
    usuario_id: number;
    usarHoraSalidaActual: boolean;
    fecha: string;
    hora_entrada: string;
    hora_salida?: string;
    lugar: string;
    evento?: string;
    comentarios?: string;
    gastos?: number;
    imagen_url?: string;
  }): Observable<any> {
    const payload: any = {
      usuario_id: data.usuario_id,
      tipo: 'salida',
      usarHoraSalidaActual: data.usarHoraSalidaActual,
      fecha: data.fecha,
      hora_entrada: data.hora_entrada,
      lugar: data.lugar
    };

    // Solo enviar hora_salida si no se usa la actual
    if (!data.usarHoraSalidaActual && data.hora_salida) {
      payload.hora_salida = data.hora_salida;
    }

    // Campos opcionales
    if (data.evento) {
      payload.evento = data.evento;
    }

    if (data.comentarios) {
      payload.comentarios = data.comentarios;
    }

    if (data.gastos !== undefined && data.gastos !== null) {
      payload.gastos = data.gastos;
    }

    if (data.imagen_url) {
      payload.imagen_url = data.imagen_url;
    }

    console.log('Enviando datos de salida:', payload);
    return this.http.post(this.apiUrl, payload);
  }

  // Método adicional para obtener fichajes (si lo necesitas)
  obtenerFichajes(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?usuario_id=${usuarioId}`);
  }
}