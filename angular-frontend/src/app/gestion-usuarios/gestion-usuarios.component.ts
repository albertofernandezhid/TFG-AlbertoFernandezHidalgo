import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';  // Asegúrate de importar tu servicio

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestion-usuarios.component.html',
})
export class GestionUsuariosComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      emailPersonal: ['', [Validators.required, Validators.email]],
      telefonoPersonal: ['', Validators.required],
      calle: [''],
      ciudad: [''],
      codigoPostal: [''],
      pais: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['empleado', Validators.required],
      activo: [true],
      emailVerificado: [false]
    });
  }

  onSubmit() {
    console.log('Formulario enviado');
    if (this.form.valid) {
      this.usuariosService.crearUsuario(this.form.value).subscribe({
        next: () => {
          alert('Usuario creado correctamente');
          this.form.reset(); // Opcional: para limpiar el formulario después de un envío exitoso
        },
        error: (err) => {
          console.error('Error al crear usuario', err);
          alert('Hubo un error al crear el usuario');
        }
      });
    } else {
      console.warn('Formulario inválido');
    }
  }

  ngOnInit() {
    this.form.statusChanges.subscribe(status => {
      console.log('Estado del formulario:', status);
      console.log('Valores:', this.form.value);
      console.log('Errores:', this.form.errors);
    });
  }
  
}