![alt posted logo](https://posted.jedidiazfagundez.com/social-media.jpg)
# Posted

## Descripción
Este proyecto es una aplicación web construida con Next.js 14, React 18 y TypeScript que consume datos de la API pública JSONPlaceholder. Implementa funcionalidad para listar usuarios, publicaciones y comentarios, con filtrado y paginación. Se ha utilizado TanStack Query para la gestión de datos y optimización de rendimiento.

## Tecnologías Utilizadas
- **React 18**
- **Next.js 14**
- **TypeScript**
- **TanStack Query** (React Query)
- **ShadCN** (opcional, para UI)
- **Tailwind CSS** para estilos

## Instalación y Configuración
Puedes ejecutar el proyecto de dos maneras: localmente con Node.js o mediante Docker (Recomendado).

### Opción 1: Instalación Local
1. Clona el repositorio:
   ```sh
   git clone https://github.com/Jedidiaz/posted.git
   cd posted
   ```
2. Instala las dependencias:
   ```sh
   pnpm install
   # o
   yarn install
   ```
3. Inicia el servidor de desarrollo:
   ```sh
   pnpm run dev
   # o
   yarn dev
   ```
4. Abre tu navegador y accede a:
   ```sh
   http://localhost:3000
   ```

### Opción 2: Usando Docker
1. Asegúrate de tener Docker y Docker Compose instalados.
2. Ejecuta el siguiente comando para levantar los contenedores:
>[!NOTE]
>Asegurate de estar dentro de la carpeta del proyecto `cd posted`.
   ```sh
   docker-compose up --build
   ```
4. Accede a la aplicación en:
   ```sh
   http://localhost:3000
   ```

## Funcionalidades Principales
- **Lista de Usuarios**: Muestra todos los usuarios de JSONPlaceholder con búsqueda.
- **Detalle de Usuario**: Información completa del usuario con opción para volver a la lista.
- **Lista de Publicaciones**: Sección con posts obtenidos de JSONPlaceholder, con ordenamiento y filtrado.
- **Detalle de Publicación**: Muestra el contenido de la publicación y sus comentarios.
- **Añadir Comentarios**: Formulario para agregar comentarios (mock local).
- **Infinite Scroll** Scroll infinito aplicado en la sección de los posts.
- **Uso de Server Components y SSR**: Optimizaciones en la carga de datos.

## Decisiones Técnicas
- **Uso de Server Components** en `/users` para mejorar la performance y evitar re-renders innecesarios.
- **TanStack Query** maneja el cache y revalidación de datos, optimizando las peticiones.
- **ShadCN** para una UI rápida y estilizada.
- **SSR**: También se utiliza SSR en `/posts, /users/[id], /posts/[id]` para mejorar la carga de contenido estático y el seo.

## Estructura del Proyecto
```bash
/src
 ├── app  # Directorio principal de Next donde se encuentra los prefetch, metadata etc
 │   ├── users
 │   │   ├── page.tsx  # Lista de usuarios
 │   │   ├── [id]
 │   │   │   ├── page.tsx  # Detalle de usuario
 │   ├── posts
 │   │   ├── page.tsx  # Lista de publicaciones
 │   │   ├── [id]
 │   │   │   ├── page.tsx  # Detalle de publicación con comentarios
 ├── components #Componentes reutilizables
 │   ├── ui # Directorio de los componentes de ShadCn
 │   ├── layout # Directorio de los componentes de custom
 ├── layout # Directorio de los componentes custom
 ├── views # Directorio del contenido de cada vista pero en el cliente
 │   ├── Users
 │   │   ├── index.tsx # Archivo principal de la vista de usuarios
 │   │   ├── Detail
 │   │   │   ├── index.tsx
 │   ├── Posts
 │   │   ├── index.tsx # Archivo principal de la vista de usuarios
 │   │   ├── Detail
 │   │   │   ├── index.tsx
 ├── utils # Directorio de utilidades varias.
```
## Rutas dentro de la web
```bash
/ # Página principal (Redirige a /posts)
/posts # Lista de publicaciones
/posts/[id] # Detalle de publicación con comentarios
/users # Lista de usuarios
/users/[id] # Detalle de usuario y sus publicaciones.
```

## Preguntas y sus respuestas
### A) **Verdadero / Falso**:
- **(Verdadero)** Next.js 14 introduce Server Actions, permitiendo ejecutar lógica en el servidor sin necesidad de un API adicional.
- **(Falso)** En React 18, la función useEffect se ejecuta antes de renderizar el componente en la pantalla.
- **(Falso)** El tipado en TypeScript elimina por completo los errores en tiempo de ejecución al compilar el proyecto.
- **(Verdadero)** TanStack Query maneja caché y revalidación automáticamente, optimizando las solicitudes HTTP.
- **(Falso)** ShadCN está enfocado únicamente en la creación de dashboards empresariales sin posibilidad de uso general.

### B) Opción Múltiple
- ¿Respecto a las Server Components de Next.js 14, ¿cuál es su principal ventaja?
(B) Renderizar componentes en el servidor, reduciendo el JavaScript que se envía al cliente.
- Para implementar Incremental Static Regeneration (ISR) con Next.js, ¿qué se requiere?
(B) Configurar la opción revalidate al usar getStaticProps().
- ¿Cuál de estas ventajas describe mejor el uso de TypeScript en un proyecto React/Next?
(B) Permite crear interfaces y tipos para ayudar a detectar errores de forma anticipada.
- ¿Si utilizamos TanStack Query en lugar de un estado global manual para
manejar datos (por ej. fetch de usuarios), ¿qué mejora principal obtenemos?
(B) Cacheo y revalidación automática de datos, reduciendo llamadas innecesarias a la API.
- ¿Cuál de estas afirmaciones sobre ShadCN es cierta?
(A) Es una colección de componentes (como botones, modales, etc.) creada para React, con énfasis en accesibilidad y personalización.

---

¡Gracias por revisar este proyecto! 🚀

