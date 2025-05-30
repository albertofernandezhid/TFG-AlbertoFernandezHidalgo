// src/app/components/empleados/empleados.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EMPRESAListaUsuariosService } from '../../../services/empresa-lista-usuarios.service';

@Component({
  selector: 'app-empleados',
  standalone: true,
  templateUrl: './empleados.component.html',
  imports: [CommonModule]
})
export class EmpleadosComponent implements OnInit {
  empleados: any[] = [];
  empleadoSeleccionado: any;

  constructor(private empleadosService: EMPRESAListaUsuariosService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadosService.getEmpleados().subscribe(
      (data) => {
        this.empleados = data;
      },
      (error) => {
        console.error('Error al cargar empleados', error);
      }
    );
  }

  mostrarDetalles(empleado: any): void {
    this.empleadoSeleccionado = empleado;
  }

  toggleActivo(empleado: any): void {
    const nuevoEstado = !empleado.activo;

    this.empleadosService.actualizarEstadoActivo(empleado.id, nuevoEstado).subscribe({
      next: () => {
        empleado.activo = nuevoEstado;

        if (this.empleadoSeleccionado && this.empleadoSeleccionado === empleado) {
          this.empleadoSeleccionado.activo = nuevoEstado;
        }

        console.log(`Estado de usuario ${empleado.id} actualizado a ${nuevoEstado}`);
      },
      error: (err) => {
        console.error('Error actualizando estado', err);
      }
    });
  }
}
