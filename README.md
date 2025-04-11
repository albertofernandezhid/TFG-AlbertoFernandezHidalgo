
# 📚 Despliegue de una Aplicación Symfony y Angular con Docker Compose
Este proyecto utiliza Docker y Docker Compose para desplegar una aplicación que incluye un backend Symfony, un frontend Angular y una base de datos PostgreSQL de manera rápida y sencilla.

---

## 🛠️ Requisitos Previos
Antes de comenzar, asegúrate de tener instalados en tu sistema:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
---

## 🚀 Instalación y Puesta en Marcha

### 1️⃣ Clonar el repositorio
Ejecuta el siguiente comando para clonar el proyecto:
```bash
git clone git@github.com:campus-CodeArts/Onboarding-SymfAngular.git
cd Onboarding-SymfAngular
```

### 2️⃣ Levantar los contenedores
Para iniciar los servicios en segundo plano, ejecuta:
```bash
docker-compose up -d
```
📌 **Nota:** La primera vez que inicies los servicios, puede tardar unos minutos en configurarse completamente.

### 3️⃣ Verificar que los contenedores están corriendo
Comprueba el estado de los contenedores con:
```bash
docker ps
```
Deberías ver tres contenedores en ejecución: **PostgreSQL**, **Symfony (backend)** y **Angular (frontend)**.

### 4️⃣ Acceder a la aplicación
- **Frontend:** Abre la siguiente URL en tu navegador:
  ```
  http://localhost:4200
  ```
- **Backend (Symfony):** Puedes ver la salida de Symfony desde:
  ```
  http://localhost:8000
  ```
- **Base de datos PostgreSQL:** El contenedor de la base de datos está en el puerto 5432, aunque normalmente no es necesario acceder directamente a este servicio en un navegador.

---

## 🔄 Detener y Reiniciar los Contenedores
Si deseas detener los contenedores en ejecución:
```bash
docker-compose down
```
Para volver a iniciarlos:
```bash
docker-compose up -d
```

---

## 🧹 Eliminar los Contenedores y Datos Persistentes
Si quieres eliminar los contenedores junto con los volúmenes y datos almacenados:
```bash
docker-compose down -v
```
⚠️ **Advertencia:** Esto eliminará todos los datos almacenados en la base de datos PostgreSQL.

---

## 🎯 Notas Finales
- Para ver los registros en tiempo real:
  ```bash
  docker-compose logs -f
  ```

Para más información sobre **Symfony**, **Angular** o **PostgreSQL**, consulta sus respectivas documentaciones oficiales.

## Comandos útiles

- Para acceder al contenedor del Frontend Angular:
```
  docker exec -it angular_frontend sh
```

- Para acceder al contenedor del Backend Symfony:
```
docker exec -it symfony_backend bash
```
- Si no tienes problemas de permisos para levantar un contenedor, prueba a ejecutar el siguiente comando:

```
sudo chmod 775 -R (contenedor_de_Symfony_o_Angular_frontend)
Ej:
sudo chmod 775 -R angular-frontend
```
---

## 📡 Endpoints de la API (Symfony)

La API expone endpoints REST para gestionar tareas. Las respuestas incluyen el campo `createdAt` con la **fecha de creación de cada tarea**, en formato `dd/mm/yyyy HH:MM`.

---

### 📋 Tabla Resumen de Endpoints

| Método | Endpoint                     | Descripción                                 |
|--------|------------------------------|---------------------------------------------|
| GET    | `/api/tasks`                 | Lista todas las tareas                      |
| POST   | `/api/tasks`                 | Crea una nueva tarea                        |
| PUT    | `/api/tasks/{id}`            | Actualiza una tarea específica              |
| DELETE | `/api/tasks/{id}`            | Elimina una tarea                           |
| PUT    | `/api/tasks/complete-all`    | Marca todas las tareas como completadas     |
| GET    | `/api/tasks/ordered?order=X` | Lista tareas ordenadas por ID (ASC o DESC)  |
