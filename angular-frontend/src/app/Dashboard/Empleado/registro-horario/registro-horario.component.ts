import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-horario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './registro-horario.component.html'
})
export class RegistroHorarioComponent implements OnInit {
  fichajeForm: FormGroup;
  entradaFichada = false;
  fechaEntrada: string = '';
  horaEntrada: string = '';
  usarHoraSalidaActual: boolean = true;

  constructor(private fb: FormBuilder) {
    this.fichajeForm = this.fb.group({
      usarFechaHoraActual: [true],
      fecha: [''],
      horaEntrada: [''],
      usarHoraSalidaActual: [true],
      horaSalida: ['', Validators.required],
      lugar: ['', Validators.required],
      evento: [''],
      comentarios: ['', Validators.maxLength(500)],
      gastos: [0, Validators.min(0)],
      imagen: [null]
    });
  }

  ngOnInit(): void {
    this.fichajeForm.get('usarFechaHoraActual')?.valueChanges.subscribe(usarActual => {
      if (usarActual) {
        this.fichajeForm.get('fecha')?.clearValidators();
        this.fichajeForm.get('horaEntrada')?.clearValidators();
      } else {
        this.fichajeForm.get('fecha')?.setValidators([Validators.required]);
        this.fichajeForm.get('horaEntrada')?.setValidators([Validators.required]);
      }
      this.fichajeForm.get('fecha')?.updateValueAndValidity();
      this.fichajeForm.get('horaEntrada')?.updateValueAndValidity();
    });
    
    this.fichajeForm.get('usarHoraSalidaActual')?.valueChanges.subscribe(usarActual => {
      this.usarHoraSalidaActual = usarActual;
      if (usarActual) {
        this.fichajeForm.get('horaSalida')?.setValue(this.getHoraActual());
      } else {
        this.fichajeForm.get('horaSalida')?.setValue('');
      }
    });
  }

  get usarFechaHoraActual() {
    return this.fichajeForm.get('usarFechaHoraActual')?.value;
  }

  getFechaActual(): string {
    return new Date().toISOString().split('T')[0];
  }

  getHoraActual(): string {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  }

  resetCamposSalida() {
    this.fichajeForm.get('usarHoraSalidaActual')?.setValue(true);
    this.fichajeForm.get('horaSalida')?.setValue(this.getHoraActual());
    this.fichajeForm.get('lugar')?.reset('');
    this.fichajeForm.get('evento')?.reset('');
    this.fichajeForm.get('comentarios')?.reset('');
    this.fichajeForm.get('gastos')?.setValue(0);
    this.fichajeForm.get('imagen')?.reset(null);
  }

  onSubmit(tipo: 'entrada' | 'salida') {
    if (tipo === 'entrada') {
      const usarFechaHoraActual = this.usarFechaHoraActual;
      
      if (usarFechaHoraActual) {
        this.fechaEntrada = this.getFechaActual();
        this.horaEntrada = this.getHoraActual();
      } else {
        this.fechaEntrada = this.fichajeForm.get('fecha')?.value;
        this.horaEntrada = this.fichajeForm.get('horaEntrada')?.value;
        
        if (!this.fechaEntrada || !this.horaEntrada) {
          alert('Por favor ingresa la fecha y hora de entrada');
          return;
        }
      }

      this.entradaFichada = true;
      this.fichajeForm.get('fecha')?.disable();
      this.fichajeForm.get('horaEntrada')?.disable();
      this.resetCamposSalida();

      // Mostrar alerta con la información de entrada
      const fechaFormateada = this.formatearFecha(this.fechaEntrada);
      alert(`Has registrado la entrada el día ${fechaFormateada} a las ${this.horaEntrada}.`);
      
      const resultado = {
        tipoFichaje: tipo,
        fecha: this.fechaEntrada,
        horaEntrada: this.horaEntrada
      };
      console.log('Fichaje registrado:', resultado);
    } else if (tipo === 'salida') {
      if (this.fichajeForm.invalid) {
        alert('Por favor completa los campos requeridos');
        return;
      }

      let horaSalida = this.fichajeForm.get('horaSalida')?.value;
      if (this.fichajeForm.get('usarHoraSalidaActual')?.value) {
        horaSalida = this.getHoraActual();
        this.fichajeForm.get('horaSalida')?.setValue(horaSalida);
      }
      
      if (!horaSalida) {
        alert('Por favor ingresa la hora de salida');
        return;
      }

      const lugar = this.fichajeForm.get('lugar')?.value;
      if (!lugar) {
        alert('Por favor ingresa el lugar');
        return;
      }

      // Mostrar alerta con la información de salida
      const fechaFormateada = this.formatearFecha(this.fechaEntrada);
      alert(`Has registrado la salida el día ${fechaFormateada} a las ${horaSalida}.`);

      const resultado = {
        tipoFichaje: tipo,
        fecha: this.fechaEntrada,
        horaEntrada: this.horaEntrada,
        horaSalida,
        lugar,
        evento: this.fichajeForm.get('evento')?.value,
        comentarios: this.fichajeForm.get('comentarios')?.value,
        gastos: this.fichajeForm.get('gastos')?.value,
        imagen: this.fichajeForm.get('imagen')?.value
      };
      console.log('Fichaje registrado:', resultado);
      this.resetFormulario();
    }
  }

  formatearFecha(fechaISO: string): string {
    if (!fechaISO) return '';
    
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  resetFormulario() {
    this.entradaFichada = false;
    this.fechaEntrada = '';
    this.horaEntrada = '';
    this.usarHoraSalidaActual = true;
    this.fichajeForm.enable();
    this.fichajeForm.reset({
      usarFechaHoraActual: true,
      fecha: '',
      horaEntrada: '',
      usarHoraSalidaActual: true,
      horaSalida: '',
      lugar: '',
      evento: '',
      comentarios: '',
      gastos: 0,
      imagen: null
    });
  }

  onImagenSeleccionada(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.fichajeForm.get('imagen')?.setValue(input.files[0]);
    } else {
      this.fichajeForm.get('imagen')?.setValue(null);
    }
  }
}