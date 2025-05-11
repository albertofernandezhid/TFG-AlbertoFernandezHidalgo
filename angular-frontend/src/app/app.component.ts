import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  title = 'MarkTime';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.idTokenClaims$.subscribe((claims) => {
      if (claims && claims.__raw) {
        const token = claims.__raw;
        this.redirectBasedOnRole(token);
      }
    });
  }

  private redirectBasedOnRole(token: string) {
    const roles = this.getRolesFromToken(token);

    if (roles.includes('Empresa')) {
      this.router.navigate(['/dashboard-empresa']);
    } else if (roles.includes('Empleado')) {
      this.router.navigate(['/dashboard-empleado']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  private getRolesFromToken(token: string): string[] {
    try {
      const decoded: any = jwt_decode(token);
      return decoded['https://myapp/roles'] || [];
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return [];
    }
  }
}
