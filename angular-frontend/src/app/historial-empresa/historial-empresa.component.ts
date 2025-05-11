import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmpleadosComponent } from '../empleados/empleados.component';
import { GestionUsuariosComponent } from '../gestion-usuarios/gestion-usuarios.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-empresa',
  standalone: true,
  imports: [RouterModule, EmpleadosComponent, GestionUsuariosComponent, CommonModule],
  templateUrl: './historial-empresa.component.html'
})
export class HistorialEmpresaComponent {
  activeSection: string = 'empleados';

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}