# Buscador de Pokémon con React y TypeScript

La aplicación consulta la [PokéAPI](https://pokeapi.co/) para buscar un Pokémon por su ID. El trabajo aplica efectos secundarios con `useEffect`, consumo asíncrono con `async/await`, manejo de errores y cancelación de peticiones mediante `AbortController`.

## Integrantes

- [CMardones06](https://github.com/CMardones06)
- [sfriz2025](https://github.com/sfriz2025)
- [bayrons2007](https://github.com/bayrons2007)

## Funcionalidades

- Carga inicial de Pikachu, correspondiente al ID `25`.
- Búsqueda por ID mediante un formulario.
- Estados visibles de carga, éxito y error.
- Visualización de nombre, ID, imagen, tipos, habilidades, altura, peso y estadísticas.
- Mensajes diferenciados para Pokémon inexistente, errores del servidor y problemas de conexión.
- Cancelación de peticiones anteriores al confirmar otra búsqueda o desmontar el componente.
- Diseño adaptable a pantallas pequeñas, foco visible y mensajes con roles de accesibilidad.

## Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 | Componentes, estados y efectos. |
| TypeScript 6 | Tipado estricto de datos, propiedades y funciones. |
| Vite 8 | Servidor de desarrollo y compilación. |
| ESLint 10 y typescript-eslint | Análisis estático del código. |
| CSS | Presentación de la interfaz y sus estados. |
| Fetch API y AbortController | Consultas HTTP y cancelación. |

Las versiones y dependencias se encuentran en `package.json` y `package-lock.json`.

## Requisitos

- Node.js 24 o superior, compatible con las dependencias actuales.
- npm.
- Git, si se descargará el proyecto mediante clonación.
- Conexión a internet para instalar dependencias y consultar la PokéAPI.

El proyecto no requiere claves de API, variables de entorno ni un backend propio.

## Instalación y ejecución

Clonar el repositorio e ingresar a su carpeta:

```bash
git clone https://github.com/CMardones06/laboratorio-frontend.git
cd laboratorio-frontend
```

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abrir la dirección que indique la terminal. Habitualmente será `http://localhost:5173`; Vite puede utilizar otro puerto si está ocupado.

Para detener el servidor, presionar `Ctrl + C` en la terminal.

## Uso

1. Al abrir la aplicación, esperar la carga inicial de Pikachu.
2. Escribir un ID entero positivo en el campo del formulario; por ejemplo, `1`, `4` o `25`.
3. Presionar **Buscar** o enviar el formulario con Enter.
4. Revisar la tarjeta del Pokémon o el mensaje de error correspondiente.

Escribir en el campo no consulta la API hasta enviar el formulario. El servicio admite ID o nombre, pero la interfaz actual utiliza un campo numérico y permite buscar por ID.

## Organización del código

| Archivo | Responsabilidad |
|---|---|
| `src/types.ts` | Define `PokemonApiResponse`, para los campos utilizados de la respuesta original, y `Pokemon`, para el modelo de la interfaz. |
| `src/services/pokemonService.ts` | Realiza la consulta, revisa el estado HTTP, gestiona errores y transforma la respuesta. |
| `src/components/BuscadorPokemon.tsx` | Controla el formulario, los estados, el efecto y la cancelación de peticiones. |
| `src/components/DetallePokemon.tsx` | Selecciona entre carga, error y resultado mediante guard clauses y muestra la tarjeta. |
| `src/App.tsx` | Compone la vista principal. |
| `src/main.tsx` | Monta React e importa los estilos globales. |
| `src/index.css` | Define el diseño, los estados visuales y la adaptación a pantallas pequeñas. |
| `tsconfig.json` | Configura TypeScript en modo estricto. |
| `eslint.config.js` | Configura el análisis estático. |

## Flujo de la búsqueda

El estado `inputValue` conserva lo escrito y `query` guarda la búsqueda confirmada. Al cambiar `query`, `useEffect` inicia una petición mediante el servicio y activa el estado de carga.

Si la consulta tiene éxito, se guarda el Pokémon. Si falla, se guarda un mensaje de error. El bloque `finally` termina la carga siempre que la petición no haya sido cancelada.

La limpieza del efecto ejecuta `controller.abort()` al cambiar la búsqueda o desmontar el componente. Las comprobaciones de `signal.aborted` evitan que una petición cancelada actualice los estados.

El componente de presentación revisa primero la carga, después el error y finalmente la existencia de datos. Esto evita acceder a propiedades de un Pokémon que todavía es `null`.

La altura y el peso se conservan en las unidades originales de la API. La interfaz divide ambos valores por diez para mostrar metros y kilogramos, respectivamente.

## Comandos disponibles

| Comando | Propósito |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run typecheck` | Comprueba los tipos sin generar archivos. |
| `npm run lint` | Ejecuta ESLint. |
| `npm run build` | Comprueba los tipos y genera la aplicación en `dist/`. |
| `npm run preview` | Permite revisar localmente una compilación existente. |

Para verificar el código:

```bash
npm run typecheck
npm run lint
npm run build
```

Para revisar la compilación, ejecutar después:

```bash
npm run preview
```

Estas comprobaciones no sustituyen las pruebas de comportamiento en el navegador.

## Pruebas manuales

| Caso | Resultado esperado |
|---|---|
| Recargar con la red ralentizada | Se muestra la carga antes de la tarjeta de Pikachu. |
| Buscar `1` | Se muestra Bulbasaur con sus datos. |
| Buscar `99999` | Se muestra el error de Pokémon inexistente y termina la carga. |
| Activar Offline en Network y buscar un ID diferente | Se muestra un error de conexión. |
| Restablecer la conexión y buscar otro ID | Se recupera la visualización de datos. |
| Buscar dos ID distintos rápidamente con Slow 3G | Se cancela la petición anterior y prevalece la última búsqueda. |
| Escribir sin enviar el formulario | No se generan consultas por cada cambio del campo. |
| Revisar la consola | No aparecen errores de ejecución ni advertencias por claves de listas. |
| Reducir el ancho de pantalla y navegar con Tab | La interfaz se adapta y el foco permanece visible. |