import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroHorarioComponent } from '../registro-horario/registro-horario.component';
import { HistorialEmpleadoComponent } from '../historial-empleado/historial-empleado.component';
import { Location } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-dashboard-empleado',
  imports: [ReactiveFormsModule, RegistroHorarioComponent, HistorialEmpleadoComponent],
  templateUrl: './dashboard-empleado.component.html',
})
export class DashboardEmpleadoComponent implements OnInit {
  fichajeForm: FormGroup;
  public authService = inject(AuthService);
  
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
    console.log(this.authService); // vemos todo lo que trae el servicio
    this.authService.idTokenClaims$.subscribe(claims => {
      console.log('Token Claims:', claims); // vemos los claims del token
    });

    this.authService.user$.subscribe(user => {
      console.log(user); // vemos los datos del usuario
    });
  }

  logout() {
    this.authService.logout();
  }

  onSubmit() {
    if (this.fichajeForm.valid) {
      console.log('Formulario enviado', this.fichajeForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }

  // Función para volver a la página anterior
  goBack() {
  this.location.back(); // Vuelve a la página anterior
  }

}