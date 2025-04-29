import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { AuthModule } from '@auth0/auth0-angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    importProvidersFrom(
      AuthModule.forRoot({
        domain: 'dev-ch2ckesyfe7jxr3e.us.auth0.com',
        clientId: 'AMdpMqlrWvvXnS4ODcFiO7Yi2Lxbc8iX',
        authorizationParams: {
          redirect_uri: window.location.origin
        }
      })
    )
  ]
});
