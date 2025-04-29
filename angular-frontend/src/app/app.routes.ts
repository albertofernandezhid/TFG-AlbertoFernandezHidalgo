import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardEmpleadoComponent } from './dashboard-empleado/dashboard-empleado.component';
import { DashboardEmpresaComponent } from './dashboard-empresa/dashboard-empresa.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';
import { RegistroEmpresaComponent } from './registro-empresa/registro-empresa.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "dashboard-empleado", component: DashboardEmpleadoComponent, canActivate: [AuthGuard]},
    {path: "dashboard-empresa", component: DashboardEmpresaComponent, canActivate: [AuthGuard]},
    {path: "politica-privacidad", component: PoliticaPrivacidadComponent},
    {path: "registro-empresa", component: RegistroEmpresaComponent},
    {path: "**", redirectTo: "login", pathMatch: "full"}
];