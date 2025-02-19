# Webapp
Aplicación hecha con react, Mongo, typescript, tailwind  y express js

## Backend

Este es el backend la aplicación construida con Express.js y MongoDB. Proporciona una API RESTful para gestionar usuarios.

### Dependencias

*   **express**: Framework web para Node.js que facilita la creación de APIs.
*   **mongoose**: Biblioteca para modelar datos de MongoDB en Node.js.
*   **body-parser**: Middleware para analizar cuerpos de solicitud HTTP en formato JSON.
*   **cors**: Middleware para habilitar solicitudes de origen cruzado (CORS).
*   **dotenv**: Biblioteca para cargar variables de entorno desde un archivo `.env`.
*   **crypto.js**: Módulo de Node.js para realizar operaciones criptográficas.

### Instalación

1.  Clona este repositorio: git clone https://github.com/Chrisdev2330/Webapp.git

2.Instala las dependencias: cd backend npm install

3. Configura la bases de datos local de mongodb:

Ve al archivo src/config/db.js y cambia el nombre de la base de datos creada en MongoDB Compass
mongodb://127.0.0.1:27017/<'nombre de la base de datos'>'

### Ejecución

1.Inicia el servidor:
npm run dev


## Frontend

### ¡La magia ocurre aquí! ✨

El frontend de esta aplicación, construido con React, es donde la interfaz cobra vida. 

### Tecnologías utilizadas

*   **React:** La librería de JavaScript para construir interfaces de usuario interactivas y dinámicas.
*   **Zustand:** Una solución simple y ligera para la gestión del estado global de la aplicación.
*   **SweetAlert2:** Para mostrar alertas y mensajes de confirmación atractivos y fáciles de usar.
*   **react-transition-group:** Para gestionar transiciones y animaciones en React de forma sencilla.

### Dependencias instaladas

*   **axios:** Cliente HTTP para realizar solicitudes al backend.
*   **react-dom:** Para renderizar componentes React en el DOM.
*   **react-scripts:** Scripts para el desarrollo, construcción y pruebas de la aplicación React.
*   **react-transition-group:** Para gestionar transiciones en React.
*   **sweetalert2:** Para mostrar alertas y mensajes de confirmación.
*   **zustand:** Para la gestión del estado global con Zustand.

### Estructura del proyecto

*   `src/`: Contiene todo el código fuente del frontend.
*   `src/assets/`: Recursos estáticos como imágenes, iconos, etc.
*   `src/components/`: Componentes reutilizables (ej: `UserTable`, `RegisterForm`, `DetailModal`).
*   `src/pages/`: Páginas principales de la aplicación (ej: `Dashboard`).
*   `src/store/`: Lógica y gestión del estado global (ej: `userStore.ts`).
*   `src/styles/`: Archivos de estilos CSS o SCSS.
*   `src/utils/`: Funciones y utilidades generales (ej: `api.js`, `helpers.js`).
*   `public/`: Archivos estáticos que se sirven directamente (ej: `index.html`).

### Arquitectura

El frontend sigue una arquitectura basada en componentes, donde cada componente es responsable de una parte específica de la interfaz de usuario. Se utiliza Zustand para la gestión del estado global, lo que permite que los componentes accedan y modifiquen los datos de manera eficiente. La comunicación con el backend se realiza a través de solicitudes HTTP utilizando Axios.

### Instalación

2.  Accede al directorio del proyecto: cd webapp
3.  Instala las dependencias: npm install

### Uso

1.  Inicia el servidor de desarrollo: `npm run dev`
2.  Abre la aplicación en tu navegador: `http://localhost:5173/`


