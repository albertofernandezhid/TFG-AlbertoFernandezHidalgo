import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { EmpleadosComponent } from './empleados/empleados.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from '../sharedComponents/calendar/calendar.component';

@Component({
  selector: 'app-dashboard-empresa',
  standalone: true,
  imports: [CommonModule, RouterModule, EmpleadosComponent, GestionUsuariosComponent, CalendarComponent],
  templateUrl: './dashboard-empresa.component.html'
})
export class DashboardEmpresaComponent implements OnInit {
  public authService = inject(AuthService);

  activeSection: string = 'empleados';

  constructor(private location: Location) {}

  ngOnInit(): void {
    console.log(this.authService);
    this.authService.idTokenClaims$.subscribe(claims => {
      console.log('Token Claims:', claims);
    });

    this.authService.user$.subscribe(user => {
      console.log(user);
    });
  }

  logout() {
    this.authService.logout();
  }

  goBack() {
    this.location.back();
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}
