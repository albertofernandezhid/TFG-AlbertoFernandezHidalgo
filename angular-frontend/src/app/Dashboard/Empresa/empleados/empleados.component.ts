// src/app/components/empleados/empleados.component.ts
import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../../services/empleados.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleados',
  standalone: true,
  templateUrl: './empleados.component.html',
  imports: [CommonModule]

})
export class EmpleadosComponent implements OnInit {
  empleados: any[] = [];
  empleadoSeleccionado: any;

  constructor(private empleadosService: EmpleadosService) {}

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
}