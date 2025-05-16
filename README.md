<p align="center">
  <img src="https://iili.io/3RYvSnt.png" alt="MarkTime Logo" width="200">
</p>

<p align="center"><i>Sistema de control horario inteligente para empresas</i></p>

## 📌 Descripción
Aplicación web para el registro de entrada/salida del personal con:

✔️ **Acceso dual**: Para trabajadores y empresas  
✔️ **Registro flexible**: Horas editables y campos adicionales  
✔️ **Transparencia total**: Historial verificable y cálculo automático de horas  

---

## ✨ Funcionalidades clave

### Para trabajadores
👨‍💼 **Dashboard empleado**:  
🔐 **Login seguro** con Auth0  
🕒 **Fichaje inteligente**  
&nbsp;&nbsp;&nbsp;&nbsp;• Hora automática (editable manualmente)  
&nbsp;&nbsp;&nbsp;&nbsp;• Campos opcionales: Evento, Lugar, Gastos, Imagen  
📜 **Historial completo** con filtros por mes  
📤 **Exportación de informes** mensuales con un clic  
⏱️ **Cálculo automático** de horas trabajadas  
📅 **Calendario** de eventos de la empresa  
🚧 *Próximamente*: Editar registros horarios

### Para empresas
👨‍💼 **Dashboard administrativo**:  
🔐 **Login seguro** con Auth0  
👥 **Gestión de empleados**  
&nbsp;&nbsp;&nbsp;&nbsp;• Visualización de usuarios y sus registros  
&nbsp;&nbsp;&nbsp;&nbsp;• Creación y edición de usuarios  
📅 **Calendario** de eventos de la empresa  
🚧 *Próximamente*: Gestión avanzada de usuarios y eventos en el calendario

---

## 🛠️ Stack tecnológico

| Área          | Tecnologías                  |
|---------------|-----------------------------|
| **Frontend**  | Angular + Tailwind      |
| **Backend**   | Symfony           |
| **Base de datos** | PostgreSQL               |
| **Autenticación** | Auth0           |
| **Despliegue**    | Docker         |

---

## 📌 Visión del proyecto
**Objetivo**: Reemplazar los sistemas obsoletos de control horario con una solución moderna, flexible y centrada en la experiencia del usuario.

---

🎯 ¿Por qué este enfoque?
   - **Claridad:** Destaca las funcionalidades clave para ambos perfiles (trabajador/empresa).
   - **Modularidad:** Facilita escalar con futuras integraciones (vacaciones, notificaciones).

---

📋 Diagrama de casos de uso

<p align="center">
  <img src="https://iili.io/3RGkP0N.png" alt="Diagrama de casos de uso">
</p>

---

## 🃏 Diseño de interfaz inicial

**Login:**

![31jwAtS.png](https://iili.io/31jwAtS.png)

**Panel de empresa**

![31jwTAl.png](https://iili.io/31jwTAl.png)

**Panel de empleado**

![31jw5o7.png](https://iili.io/31jw5o7.png)

---

## 🃏 Diseño de interfaz final

**Landing page:**

![Landing page](https://iili.io/3rDAyHg.png)

**Footer:**

![Footer](https://iili.io/3rp7VkP.png)

**Registra tu empresa:**

![Registra tu empresa](https://iili.io/3rDADKP.png)

**Política de privacidad:**

![Política de privacidad](https://iili.io/3rDAbl1.png)

**Login:**

![Login](https://iili.io/3rDAZiB.png)

**Panel de empresa / Lista de empleados:**  
*(Debe mostrar los empleados registrados y al hacer click mostrar su historial de fichajes)*

![Lista de empleados](https://iili.io/3rDR9Ra.png)

**Panel de empresa / Crear usuario:**  
*(Formulario para registrar empleados)*

![Crear usuario](https://iili.io/3rDRHOJ.png)

**Panel de empresa / Calendario:**  
*(Calendario de Google importado con FullCalendar)*

![Calendario empresa](https://iili.io/3rDR3Vp.png)

**Panel de empleado / Fichar entrada:**  
*(Formulario para fichar entrada laboral)*

![Fichar entrada](https://iili.io/3rDRFiN.png)

**Panel de empleado / Fichar salida:**  
*(Formulario para fichar salida laboral y añadir datos opcionales. Solo aparece si se ha registrado la entrada)*

![Fichar salida](https://iili.io/3rDRffI.png)

**Panel de empleado / Historial:**  
*(Debe mostrar los registros horarios del mes/año indicado. Opción de generar PDF con los datos registrados usando jspdf)*

![Historial](https://iili.io/3rDRqlt.png)

**Panel de empleado / Calendario:**  
*(Calendario de Google importado con FullCalendar)*

![Calendario empleado](https://iili.io/3rDR3Vp.png)

---

## 🚀 Instrucciones para desplegar MarkTime

### 1. Clona el repositorio

```bash
git clone git@github.com:albertofernandezhid/TFG-AlbertoFernandezHidalgo.git
cd TFG-AlbertoFernandezHidalgo
```

### 2. Verifica que Docker y Docker Compose estén instalados

Asegúrate de tener Docker y Docker Compose instalados correctamente:

```bash
docker -v
docker compose version
```

### 3. Levanta los servicios con Docker Compose

Construye e inicia los contenedores definidos en el archivo `docker-compose.yml`:

```bash
docker compose up -d --build
```

Esto levantará los siguientes servicios:

- `marktime_frontend` → Angular (puerto `4200`)
- `marktime_backend` → Symfony API (puerto `8000`)
- `marktime_postgres` → PostgreSQL (puerto `5432`)

### 4. Accede a la aplicación

- **Frontend Angular:** [http://localhost:4200](http://localhost:4200)
- **Backend Symfony (API):** [http://localhost:8000](http://localhost:8000)
