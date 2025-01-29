# 📅 Calendario Prueba React

Un proyecto de calendario desarrollado con React, Vite, Redux, DayPilot for React y Lucide React, que permite la gestión de eventos diarios y semanales con una interfaz interactiva y moderna.

### 🎬 Tutorial de uso

https://drive.google.com/file/d/1vkM0HtITFYvKjB6WQ47-8Uw6PtrCRNJo/view?usp=sharing

### 🚀 Diseño en figma

https://www.figma.com/design/QXEUicDnjD7d0tETrU2IIp/Calendario?node-id=0-1&t=7ppU0ATn1UIYkZRq-1

### 🚀 Tecnologías utilizadas

-   ⚛ React – Biblioteca para construir interfaces de usuario.
-   ⚡ Vite – Herramienta de desarrollo rápida para proyectos React.
-   🏛 Redux – Manejo de estado global para la gestión de eventos.
-   📅 DayPilot for React – Librería de calendario interactivo.
-   ✨ Lucide React – Iconos modernos y personalizables.

### 📌 Características

🔹 1. Desarrollo modular y escalable
Se utilizó React con Vite, lo que permitió una arquitectura modular donde los componentes están bien estructurados y reutilizables. El uso de Redux Toolkit ayuda a gestionar el estado de manera centralizada, facilitando la escalabilidad y mantenimiento.

🔹 2. Enfoque en la experiencia de usuario (UX/UI)

-   Se integró DayPilot para ofrecer una interfaz de calendario interactiva y adaptable.
-   Se aplicó Tailwind CSS para lograr un diseño limpio, responsivo y bien estructurado.
-   Se incorporó Lucide React para mejorar la iconografía y hacer la interfaz más intuitiva.
-   Se consideraron detalles como la selección visual del día en el mini calendario y la sincronización con el input type="date", lo que mejora la navegación.

🔹 3. Funcionalidad personalizada para la gestión de eventos

-   Se permitió la creación, edición y eliminación de eventos con un manejo eficiente del estado a través de Redux.
-   Se implementaron eventos de manera visual en el calendario.
-   Se establecieron comportamientos específicos como la ocultación de texto en vista de semana en pantallas pequeñas.

🔹 4. Uso de buenas prácticas y código mantenible

-   Se aplicaron buenas prácticas en la organización de carpetas y estructura de código para facilitar la escalabilidad.
-   Se hizo uso de useMemo y useCallback para mejorar el rendimiento del calendario.
-   Se incorporó un Modal para gestionar eventos de manera clara sin afectar la navegación.

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
