import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EMPLEADOFichajesService } from '../../../services/empleado-fichajes.service';

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
  cargandoEntrada = false;
  cargandoSalida = false;

  // ⚠️ Sustituye por el ID real del usuario
  usuarioId = 1;

  constructor(
    private fb: FormBuilder,
    private fichajesService: EMPLEADOFichajesService
  ) {
    this.fichajeForm = this.fb.group({
      usarFechaHoraActual: [true],
      fecha: [''],
      horaEntrada: [''],
      usarHoraSalidaActual: [true],
      horaSalida: [''],
      lugar: ['', Validators.required],
      evento: [''],
      comentarios: ['', Validators.maxLength(500)],
      gastos: [0, [Validators.min(0), Validators.pattern(/^\d*\.?\d*$/)]],
      imagen_url: [null]
    });
  }

  ngOnInit(): void {
    // Manejar cambios en usar fecha/hora actual para entrada
    this.fichajeForm.get('usarFechaHoraActual')?.valueChanges.subscribe(usarActual => {
      if (usarActual) {
        this.fichajeForm.get('fecha')?.clearValidators();
        this.fichajeForm.get('horaEntrada')?.clearValidators();
        this.fichajeForm.get('fecha')?.setValue('');
        this.fichajeForm.get('horaEntrada')?.setValue('');
      } else {
        this.fichajeForm.get('fecha')?.setValidators([Validators.required]);
        this.fichajeForm.get('horaEntrada')?.setValidators([Validators.required]);
        // Establecer valores por defecto
        this.fichajeForm.get('fecha')?.setValue(this.getFechaActual());
        this.fichajeForm.get('horaEntrada')?.setValue(this.getHoraActual());
      }
      this.fichajeForm.get('fecha')?.updateValueAndValidity();
      this.fichajeForm.get('horaEntrada')?.updateValueAndValidity();
    });

    // Manejar cambios en usar hora actual para salida
    this.fichajeForm.get('usarHoraSalidaActual')?.valueChanges.subscribe(usarActual => {
      this.usarHoraSalidaActual = usarActual;
      if (usarActual) {
        this.fichajeForm.get('horaSalida')?.setValue(this.getHoraActual());
        this.fichajeForm.get('horaSalida')?.clearValidators();
      } else {
        this.fichajeForm.get('horaSalida')?.setValue('');
        this.fichajeForm.get('horaSalida')?.setValidators([Validators.required]);
      }
      this.fichajeForm.get('horaSalida')?.updateValueAndValidity();
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
    this.fichajeForm.get('lugar')?.setValue('');
    this.fichajeForm.get('evento')?.setValue('');
    this.fichajeForm.get('comentarios')?.setValue('');
    this.fichajeForm.get('gastos')?.setValue(0);
    this.fichajeForm.get('imagen_url')?.setValue(null);
  }

  onSubmit(tipo: 'entrada' | 'salida') {
    if (tipo === 'entrada') {
      this.registrarEntrada();
    } else if (tipo === 'salida') {
      this.registrarSalida();
    }
  }

  private registrarEntrada() {
    const usarFechaHoraActual = this.usarFechaHoraActual;
    
    // Validar campos si no se usa fecha/hora actual
    if (!usarFechaHoraActual) {
      const fecha = this.fichajeForm.get('fecha')?.value;
      const horaEntrada = this.fichajeForm.get('horaEntrada')?.value;
      
      if (!fecha || !horaEntrada) {
        alert('Por favor ingresa la fecha y hora de entrada');
        return;
      }
    }

    this.cargandoEntrada = true;

    // Establecer valores para mostrar en la UI
    if (usarFechaHoraActual) {
      this.fechaEntrada = this.getFechaActual();
      this.horaEntrada = this.getHoraActual();
    } else {
      this.fechaEntrada = this.fichajeForm.get('fecha')?.value;
      this.horaEntrada = this.fichajeForm.get('horaEntrada')?.value;
    }

    const entradaData = {
      usuario_id: this.usuarioId,
      usarFechaHoraActual: usarFechaHoraActual,
      fecha: this.fechaEntrada,
      hora_entrada: this.horaEntrada,
      lugar: this.fichajeForm.get('lugar')?.value || undefined
    };

    this.fichajesService.registrarEntrada(entradaData).subscribe({
      next: (res: any) => {
        console.log('Entrada registrada:', res);
        this.entradaFichada = true;
        this.fichajeForm.get('fecha')?.disable();
        this.fichajeForm.get('horaEntrada')?.disable();
        this.fichajeForm.get('usarFechaHoraActual')?.disable();
        this.resetCamposSalida();
        
        const fechaFormateada = this.formatearFecha(this.fechaEntrada);
        alert(`✅ Entrada registrada correctamente el día ${fechaFormateada} a las ${this.horaEntrada}.`);
        this.cargandoEntrada = false;
      },
      error: (err: any) => {
        console.error('Error al registrar entrada:', err);
        alert(`❌ Error al registrar entrada: ${err.error?.error || 'Error desconocido'}`);
        this.cargandoEntrada = false;
      }
    });
  }

  private registrarSalida() {
    // Validar formulario
    if (this.fichajeForm.invalid) {
      this.marcarCamposComoTocados();
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    let horaSalida = this.fichajeForm.get('horaSalida')?.value;
    const usarHoraSalidaActual = this.fichajeForm.get('usarHoraSalidaActual')?.value;

    if (usarHoraSalidaActual) {
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

    this.cargandoSalida = true;

    const salidaData = {
      usuario_id: this.usuarioId,
      usarHoraSalidaActual: usarHoraSalidaActual,
      fecha: this.fechaEntrada,
      hora_entrada: this.horaEntrada,
      hora_salida: horaSalida,
      lugar: lugar,
      evento: this.fichajeForm.get('evento')?.value || undefined,
      comentarios: this.fichajeForm.get('comentarios')?.value || undefined,
      gastos: this.fichajeForm.get('gastos')?.value || 0,
      imagen_url: this.fichajeForm.get('imagen_url')?.value || undefined
    };

    this.fichajesService.registrarSalida(salidaData).subscribe({
      next: (res: any) => {
        console.log('Salida registrada:', res);
        const fechaFormateada = this.formatearFecha(this.fechaEntrada);
        alert(`✅ Salida registrada correctamente el día ${fechaFormateada} a las ${horaSalida}.`);
        this.resetFormulario();
        this.cargandoSalida = false;
      },
      error: (err: any) => {
        console.error('Error al registrar salida:', err);
        alert(`❌ Error al registrar salida: ${err.error?.error || 'Error desconocido'}`);
        this.cargandoSalida = false;
      }
    });
  }

  private marcarCamposComoTocados() {
    Object.keys(this.fichajeForm.controls).forEach(key => {
      this.fichajeForm.get(key)?.markAsTouched();
    });
  }

  formatearFecha(fechaISO: string): string {
    if (!fechaISO) return '';
    const fecha = new Date(fechaISO + 'T00:00:00');
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
    this.cargandoEntrada = false;
    this.cargandoSalida = false;
    
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
      imagen_url: null
    });
  }

  onImagenSeleccionada(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        input.value = '';
        this.fichajeForm.get('imagen_url')?.setValue(null);
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo es demasiado grande. Máximo 5MB');
        input.value = '';
        this.fichajeForm.get('imagen_url')?.setValue(null);
        return;
      }
      
      // Aquí podrías subir la imagen a un servidor y obtener la URL
      // Por ahora, solo guardamos el nombre del archivo
      this.fichajeForm.get('imagen_url')?.setValue(file.name);
    } else {
      this.fichajeForm.get('imagen_url')?.setValue(null);
    }
  }

  // Getters para facilitar el acceso a los controles en el template
  get fechaControl() { return this.fichajeForm.get('fecha'); }
  get horaEntradaControl() { return this.fichajeForm.get('horaEntrada'); }
  get horaSalidaControl() { return this.fichajeForm.get('horaSalida'); }
  get lugarControl() { return this.fichajeForm.get('lugar'); }
  get eventoControl() { return this.fichajeForm.get('evento'); }
  get comentariosControl() { return this.fichajeForm.get('comentarios'); }
  get gastosControl() { return this.fichajeForm.get('gastos'); }
}