<p align="center">
  <img src="https://iili.io/3RYvSnt.png" alt="MarkTime Logo" width="200">
</p>
<p align="center"><i>Sistema de control horario inteligente para empresas</i></p>
<p align="center">
  <img src="https://img.shields.io/badge/Angular-19-red?logo=angular">
  <img src="https://img.shields.io/badge/Symfony-6-black?logo=symfony">
  <img src="https://img.shields.io/badge/PostgreSQL-Relational-blue?logo=postgresql">
  <img src="https://img.shields.io/badge/Docker-Containerized-blue?logo=docker">
</p>
---
## ￼ Índice
- [￼ MarkTime – Introducción](#-marktime--control-horario-digital-para-empresas)
- [￼ Funcionalidades clave](#-funcionalidades-clave)
- [￼ Motivación](#-motivación)
- [￼ Infraestructura y Seguridad](#-infraestructura-y-seguridad)
- [￼ Diagrama de casos de uso](#-diagrama-de-casos-de-uso)
- [￼ Diseño de interfaz](#-diseño-de-interfaz)
- [￼ Guía de Despliegue](#-guía-de-despliegue)
- [￼ Licencia](#-licencia)
---
# ￼ MarkTime – Control Horario Digital para Empresas
**MarkTime** es una aplicación web moderna desarrollada como parte de un proyecto de fin de grado, cuyo objetivo principal es digitalizar y simplificar el control horario en las empresas.
Con una interfaz intuitiva para empleados y un panel administrativo potente para empresarios, la plataforma permite registrar entradas y salidas, añadir gastos y eventos, gestionar usuarios y visualizar todo desde un calendario centralizado.
La autenticación segura se realiza mediante **Auth0**, y el sistema está construido con **Angular**, **Symfony** y **PostgreSQL**, todo orquestado con **Docker** para facilitar su despliegue y escalabilidad.
> Una solución práctica, escalable y pensada para acabar con el caos del papel y las hojas de cálculo en la gestión laboral.
---
# ￼ Funcionalidades clave
### ￼ Funcionalidades para Empleados
- ￼ **Login mediante Auth0**
  Acceso seguro a la plataforma usando autenticación con Auth0.
- ￼ **Fichaje (Entrada / Salida)**
  Registro de jornada laboral con posibilidad de añadir:
  - Eventos relacionados
  - Gastos
  - Imágenes adjuntas (por ejemplo, tickets o justificantes)
- ￼ **Historial de fichajes**
  Visualización de registros anteriores con filtros por rango de fechas.
- ￼ **Calendario de eventos**
  Consulta y seguimiento de eventos laborales en un calendario integrado.
---
### ￼ Funcionalidades para Empresarios
- ￼ **Listado de empleados y sus registros horarios**
  Visualización global de todos los empleados y sus horas fichadas.
- ￼ **Creación y gestión de usuarios**
  Alta, modificación o baja de cuentas de empleados desde un panel administrativo.
- ￼ **Visualización de datos adjuntos**
  Acceso a archivos relacionados como tickets de gastos, facturas u otras evidencias.
- ￼ **Calendario de eventos corporativos**
  Gestión y seguimiento de eventos comunes a todo el equipo.
---
## ￼ Motivación
**¿Por qué elegí este proyecto?**
Porque quiero hacer algo práctico que realmente ayude a las empresas a dejar atrás el caos de los papeles. Fichar en papel o en hojas de cálculo es un rollo: se pierden cosas, hay fallos, y al final nadie sabe cuántas horas se han trabajado de verdad.
Con **"MarkTime"**, la idea es ofrecer una herramienta simple y accesible para que:
- Los empleados puedan fichar sin complicaciones.
- Los jefes puedan tener todo controlado sin volverse locos.
Además, me motiva que pueda ser un proyecto escalable. Por ejemplo, más adelante podría incorporar funcionalidades como un **calendario de vacaciones**, notificaciones o estadísticas avanzadas.
---
# ￼ Cuadro Tecnológico
A continuación se detallan las tecnologías, lenguajes y herramientas empleadas en el desarrollo del proyecto **MarkTime**, organizadas por capas:
### ￼ Frontend – Angular + Tailwind CSS
- **Framework principal:** Angular 15
- **Lenguajes usados:** TypeScript, HTML, CSS
- **Estilizado:** TailwindCSS
- **Librerías externas:**
  - Auth0
  - FullCalendar
  - jspdf
  - Heroicons (SVG inline)
- **Entorno:** Visual Studio Code + Docker
- **Responsividad:** Pendiente de implementación
### ￼ Backend – Symfony (PHP)
- **Framework:** Symfony 6
- **Lenguaje:** PHP
- **Autenticación:** Auth0 + JWT
- **API:** RESTful
- **ORM:** Doctrine
- **Migraciones:** Symfony Console + Doctrine Migrations
### ￼ Base de datos – PostgreSQL
- **Motor:** PostgreSQL
- **Entidades clave:** Empresa, Usuario, Fichaje
- **Relaciones:**
  - Una empresa → muchos usuarios
  - Un usuario → muchos fichajes
### ￼ Infraestructura y Seguridad
- **Entorno local:** Docker Compose para levantar todos los servicios (frontend, backend y base de datos)
- **Versionado:** Git + GitHub para control y seguimiento del código
- **Protocolo:**  `HTTPS` para comunicaciones seguras
- **Seguridad:**
  - Autenticación mediante **Auth0**
  - Autorización basada en **JWT (JSON Web Tokens)**
  - Gestión de permisos por **roles diferenciados** (empleado / empresario)
  - Protección de rutas y datos sensibles tanto en frontend como en backend
---
# ￼ Diagrama de casos de uso
<p align="center">
  <img src="https://iili.io/3RGkP0N.png" alt="Diagrama de casos de uso">
</p>
---
# ￼ Diseño de interfaz
![Pantalla 1](https://iili.io/FHyk8Ft.png)
![Pantalla 2](https://iili.io/FHykjwv.png)
![Pantalla 3](https://iili.io/FHykOnp.png)
![Pantalla 4](https://iili.io/FHykhAJ.png)
![Pantalla 5](https://iili.io/FHyk4AG.png)
![Pantalla 6](https://iili.io/FHykPt4.png)
![Pantalla 7](https://iili.io/FHykLV2.png)
![Pantalla 8](https://iili.io/FHykQPS.png)
![Pantalla 9](https://iili.io/FHyktK7.png)
![Pantalla 10](https://iili.io/FHykDl9.png)
---
# ￼ Guía de Despliegue
## ￼ Requisitos previos
- Docker
- Docker Compose
---
## ￼ Pasos para el despliegue
### 1. Clonar el repositorio
```bash
git clone https://github.com/albertofernandezhid/TFG-AlbertoFernandezHidalgo.git
cd TFG-AlbertoFernandezHidalgo
```
### 2. Construir y levantar los contenedores
```bash
docker-compose up --build
```
### 3. Instalar dependencias del frontend (Angular)
Accede al contenedor de Angular para instalar las dependencias del proyecto:
```bash
docker exec -it angular-frontend bash
npm install
```
### 4. Instalar dependencias del backend (Symfony)
Una vez levantado el contenedor del backend, accede a él para instalar las dependencias PHP necesarias:
```bash
docker exec -it symfony-backend bash
composer install
```
### 5. Ejecutar las migraciones de base de datos
Symfony utiliza Doctrine para gestionar la base de datos a través de migraciones. Una vez que hayas configurado correctamente el archivo `.env` con tu `DATABASE_URL`, ejecuta el siguiente comando desde el contenedor del backend:
```bash
docker exec -it symfony-backend bash
php bin/console doctrine:migrations:migrate
```
Este comando aplicará las migraciones existentes y creará todas las tablas necesarias en tu base de datos.
Si deseas comprobar que las migraciones se han ejecutado correctamente, puedes usar:
```bash
php bin/console doctrine:migrations:status
```
Este comando te mostrará el estado de las migraciones (pendientes, ejecutadas, etc.). Es útil para verificar si Doctrine ha detectado correctamente los cambios en las entidades y si quedan operaciones por aplicar.
En caso de que hayas creado nuevas entidades o modificado las existentes, puedes generar una nueva migración con:
```bash
php bin/console make:migration
```
Y luego aplicarla con:
```bash
php bin/console doctrine:migrations:migrate
```
### 6. Acceder a la aplicación
Una vez que los contenedores estén activos y las migraciones hayan sido aplicadas correctamente, ya puedes acceder a la aplicación desde tu navegador:
- ￼ **Frontend Angular**: [http://localhost:4200](http://localhost:4200)
  Aquí verás la interfaz de usuario principal, desarrollada con Angular.
- ￼ **Backend Symfony (API RESTful)**: [http://localhost:8000](http://localhost:8000)
  Este endpoint expone los recursos del backend para el control horario y autenticación.
> Asegúrate de que estos puertos no estén en uso por otros servicios. Si lo están, puedes cambiar la configuración en el archivo `docker-compose.yml`.
- **Acceder a un contenedor en ejecución (por ejemplo, Symfony)**:
```bash
docker exec -it symfony-backend bash
```
# ￼ Licencia
Este proyecto ha sido desarrollado como parte del **Trabajo de Fin de Grado (TFG)** de **Alberto Fernández Hidalgo**, estudiante del Ciclo Formativo de Grado Superior en **Desarrollo de Aplicaciones Multiplataforma (DAM)** – Promoción 2023/2025.
Queda autorizado el uso con fines académicos, de aprendizaje y revisión técnica.
Queda prohibida su reproducción o distribución con fines comerciales sin autorización expresa del autor.
© 2025 Alberto Fernández Hidalgo. Todos los derechos reservados.