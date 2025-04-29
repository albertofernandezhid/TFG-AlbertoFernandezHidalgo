import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-horario',
  imports: [ReactiveFormsModule],
  templateUrl: './registro-horario.component.html'
})
export class RegistroHorarioComponent {
  fichajeForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

  onSubmit() {
    if (this.fichajeForm.valid) {
      console.log('Formulario enviado', this.fichajeForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}