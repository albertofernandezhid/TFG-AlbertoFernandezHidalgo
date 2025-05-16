import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegistroEmpresaComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Inicialización del formulario
    this.registroForm = this.fb.group({
      nombreEmpresa: ['', Validators.required],
      cif: ['', [Validators.required, Validators.pattern(/^[A-HJ-NP-SUVW]\d{8}$/i)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$') ]], 
      direccion: ['', Validators.required],
      usuarioAdmin: ['', Validators.required],
      contrasenaAdmin: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$')]], // Contraseña con requisitos
      verificarContrasenaAdmin: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Validación personalizada para que las contraseñas coincidan
  passwordMatchValidator(formGroup: FormGroup) {
    const { contrasenaAdmin, verificarContrasenaAdmin } = formGroup.controls;
    if (contrasenaAdmin.value !== verificarContrasenaAdmin.value) {
      verificarContrasenaAdmin.setErrors({ mismatch: true });
    } else {
      verificarContrasenaAdmin.setErrors(null);
    }
  }

  // Función para validar teléfono: solo números permitidos
  validatePhoneNumber(event: KeyboardEvent) {
    const inputChar = event.key;
    if (!/^\d$/.test(inputChar)) {
      event.preventDefault();
    }
  }

  // Función para enviar el formulario
  onSubmit() {
    if (this.registroForm.valid) {
      console.log(this.registroForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }

  // Función para volver a la página anterior
  goBack() {
    this.location.back();
  }
}
