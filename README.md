# 📅 Calendario Prueba React

Un proyecto de calendario desarrollado con React, Vite, Redux, DayPilot for React y Lucide React, que permite la gestión de eventos diarios y semanales con una interfaz interactiva y moderna.

### 🚀 Diseño en figma

https://www.figma.com/design/QXEUicDnjD7d0tETrU2IIp/Calendario?node-id=0-1&t=7ppU0ATn1UIYkZRq-1

### 🚀 Tecnologías utilizadas

-   ⚛ React – Biblioteca para construir interfaces de usuario.
-   ⚡ Vite – Herramienta de desarrollo rápida para proyectos React.
-   🏛 Redux – Manejo de estado global para la gestión de eventos.
-   📅 DayPilot for React – Librería de calendario interactivo.
-   ✨ Lucide React – Iconos modernos y personalizables.

### 📌 Características

-   Vista de día y semana para los eventos.
-   Mini calendario (DayPilotNavigator) para una navegación intuitiva.
-   Agregar, editar y eliminar eventos con validaciones de superposición de horarios.
-   Cambio dinámico de vista mediante un selector.
-   Diseño responsivo y moderno con Tailwind CSS.

### 🔧 Instalación y configuración

Clonar el repositorio

```sh
git clone https://github.com/corderoangel/calendario-prueba.git
cd calendario-prueba
```

Instalar dependencias

```sh
npm install
```

Ejecutar el proyecto

```sh
npm run dev
```

Abrir en el navegador
El proyecto estará disponible en: http://localhost:5173

### 🛠 Funcionalidades técnicas

-   Manejo de estado con Redux para gestionar los eventos de manera eficiente.
-   Uso de hooks (useState, useEffect, useMemo, useCallback) para optimizar el rendimiento.
-   Eventos dinámicos con DayPilot, incluyendo:
    -   Click en un evento para editarlo.
    -   Mini calendario sincronizado con la vista principal.
    -   Eliminación de eventos.
