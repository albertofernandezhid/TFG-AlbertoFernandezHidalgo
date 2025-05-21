import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { EMPRESACrearUsuariosService } from '../../../services/empresa-crear-usuarios.service';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const passwordRepeat = control.get('passwordRepeat');

    if (password && passwordRepeat && password.value !== passwordRepeat.value) {
      passwordRepeat.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  };
}

export function dniValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    
    const dniRegex = /^[0-9]{8}[A-Z]$/;
    return dniRegex.test(control.value) ? null : { invalidDni: true };
  };
}

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    
    const phoneRegex = /^[0-9]{9}$/;
    return phoneRegex.test(control.value) ? null : { invalidPhone: true };
  };
}

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestion-usuarios.component.html',
})
export class GestionUsuariosComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private usuariosService: EMPRESACrearUsuariosService) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      dni: ['', [Validators.required, dniValidator()]],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      emailPersonal: ['', [Validators.required, Validators.email]],
      telefonoPersonal: ['', [Validators.required, phoneValidator()]],
      calle: [''],
      ciudad: [''],
      codigoPostal: ['', [Validators.pattern(/^[0-9]{5}$/)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', Validators.required],
    }, { validators: passwordMatchValidator() });
  }

  ngOnInit() {
    this.form.statusChanges.subscribe(status => {
      console.log('Estado del formulario:', status);
      console.log('Valores:', this.form.value);
      console.log('Errores:', this.form.errors);
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return field ? (field.invalid && (field.touched || this.submitted)) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field || !field.errors) return '';
    
    const errors = field.errors;
    
    if (errors['required']) return 'Este campo es obligatorio';
    if (errors['email']) return 'Formato de email inválido';
    if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength']) return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['pattern']) return 'Formato inválido';
    if (errors['invalidDni']) return 'DNI inválido (8 números y 1 letra)';
    if (errors['invalidPhone']) return 'Teléfono inválido (9 dígitos)';
    if (errors['passwordMismatch']) return 'Las contraseñas no coinciden';
    
    return 'Campo inválido';
  }

  onlyDigits(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onSubmit() {
    this.submitted = true;
    console.log('Formulario enviado');
    
    if (this.form.valid) {
      const userData = { ...this.form.value };
      delete userData.passwordRepeat;
      
      this.usuariosService.crearUsuario(userData).subscribe({
        next: () => {
          alert('Usuario creado correctamente');
          this.form.reset();
          this.submitted = false;
        },
        error: (err) => {
          console.error('Error al crear usuario', err);
          alert('Hubo un error al crear el usuario');
        }
      });
    } else {
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
      console.warn('Formulario inválido');
    }
  }
}