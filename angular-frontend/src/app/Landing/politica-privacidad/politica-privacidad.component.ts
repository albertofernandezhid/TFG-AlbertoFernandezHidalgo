import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-politica-privacidad',
  imports: [CommonModule, RouterModule],
  templateUrl: './politica-privacidad.component.html'
})
export class PoliticaPrivacidadComponent {

  constructor(
    private location: Location
  ) { }

// Función para volver a la página anterior
goBack() {
  this.location.back();
}

}
