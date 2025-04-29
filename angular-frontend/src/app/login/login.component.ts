import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  selectedRole: 'empleado' | 'empresa' = 'empleado';

  // Inyectar Location en el constructor
  constructor(
    private fb: FormBuilder,
    private location: Location
  ) {
    // Inicialización del formulario con validaciones
    this.loginForm = this.fb.group({
      codecompany: ['', Validators.required], // Campo requerido
      adminuser: ['', Validators.required],   // Campo requerido solo para empresa
      userpass: ['', Validators.required]     // Campo requerido
    });
  }

  // Función para seleccionar el rol de usuario
  selectRole(role: 'empleado' | 'empresa') {
    this.selectedRole = role;

    // Cambiar la validación de adminuser dependiendo del rol
    if (role === 'empresa') {
      this.loginForm.get('adminuser')?.setValidators(Validators.required);
    } else {
      this.loginForm.get('adminuser')?.clearValidators();
    }
    this.loginForm.get('adminuser')?.updateValueAndValidity();
  }

  // Función para volver a la página anterior
  goBack() {
    this.location.back(); // Vuelve a la página anterior
  }

  // Función para enviar el formulario
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario enviado:', this.loginForm.value);
    } else {
      console.log('Formulario inválido');
      this.loginForm.markAllAsTouched(); // Marca todos los campos como tocados
    }
  }
}