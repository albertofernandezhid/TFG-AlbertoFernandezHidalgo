// src/app/interceptors/credentials.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Clonar la solicitud para agregar withCredentials
    const authReq = request.clone({
      withCredentials: true
    });
    
    // Enviar la solicitud clonada al siguiente manipulador
    return next.handle(authReq);
  }
}