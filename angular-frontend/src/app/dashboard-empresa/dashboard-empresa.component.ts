import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { HistorialEmpresaComponent} from '../historial-empresa/historial-empresa.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-dashboard-empresa',
  imports: [HistorialEmpresaComponent],
  templateUrl: './dashboard-empresa.component.html'
})
export class DashboardEmpresaComponent implements OnInit {
  public authService = inject(AuthService);

  constructor(
    private location: Location
  ) { }

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



// Función para volver a la página anterior
goBack() {
  this.location.back(); // Vuelve a la página anterior
}

}
