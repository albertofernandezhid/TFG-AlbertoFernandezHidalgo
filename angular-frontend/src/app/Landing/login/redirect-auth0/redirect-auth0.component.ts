import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  standalone: true,
  selector: 'app-redirect-auth0',
  template: '<p>Redirigiendo al login...</p>'
})
export class RedirectAuth0Component implements OnInit {

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.loginWithRedirect();
  }
}