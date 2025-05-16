import { Routes } from '@angular/router';
import { HomeComponent } from './Landing/home.component';
import { LoginComponent } from './Landing/login/login.component';
import { DashboardEmpleadoComponent } from './Dashboard/Empleado/dashboard-empleado.component';
import { DashboardEmpresaComponent } from './Dashboard/Empresa/dashboard-empresa.component';
import { PoliticaPrivacidadComponent } from './Landing/politica-privacidad/politica-privacidad.component';
import { RegistroEmpresaComponent } from './Landing/registro-empresa/registro-empresa.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "dashboard-empleado", component: DashboardEmpleadoComponent, canActivate: [AuthGuard]},
    {path: "dashboard-empresa", component: DashboardEmpresaComponent, canActivate: [AuthGuard]},
    {path: "politica-privacidad", component: PoliticaPrivacidadComponent},
    {path: "registro-empresa", component: RegistroEmpresaComponent},
    {path: "**", component: HomeComponent},

];