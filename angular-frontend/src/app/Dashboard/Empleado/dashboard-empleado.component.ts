import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroHorarioComponent } from './registro-horario/registro-horario.component';
import { HistorialEmpleadoComponent } from './historial-empleado/historial-empleado.component';
import { Location } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../sharedComponents/calendar/calendar.component';

@Component({
  selector: 'app-dashboard-empleado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RegistroHorarioComponent, HistorialEmpleadoComponent, CalendarComponent],
  templateUrl: './dashboard-empleado.component.html',
})
export class DashboardEmpleadoComponent implements OnInit {
  fichajeForm: FormGroup;
  public authService = inject(AuthService);
  
  activeSection: 'registro' | 'historial' | 'calendario' = 'registro';

  constructor(
    private location: Location,
    private fb: FormBuilder) {
    this.fichajeForm = this.fb.group({
      fecha: ['', Validators.required],
      horaEntrada: ['', Validators.required],
      horaSalida: ['', Validators.required],
      lugar: ['', Validators.required],
      evento: ['', Validators.required],
      comentarios: ['', Validators.maxLength(500)],
      gastos: ['', [Validators.required, Validators.min(0)]],
      imagen: ['', Validators.required]
    });
  }

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

  setActiveSection(section: 'registro' | 'historial' | 'calendario') {
    this.activeSection = section;
  }

  onSubmit() {
    if (this.fichajeForm.valid) {
      console.log('Formulario enviado', this.fichajeForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }

  goBack() {
    this.location.back();
  }
}
