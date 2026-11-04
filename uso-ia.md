# Declaración grupal de uso de inteligencia artificial

## Identificación y alcance

- **Proyecto:** Buscador de Pokémon con React y TypeScript.
- **Asignatura:** Desarrollo de Frontend.
- **Carrera e institución:** Ingeniería Civil en Informática, Universidad Católica de Temuco.
- **Repositorio:** https://github.com/CMardones06/laboratorio-frontend
- **Grupo:** CMardones06, sfriz2025 y bayrons2007.
- **Herramienta utilizada:** ChatGPT, de OpenAI, con funciones de generación de texto y código, lectura de archivos, revisión de repositorios y ejecución de comprobaciones cuando estuvieron disponibles.
- **Fecha de esta declaración:** 4 de noviembre de 2026.

Esta declaración reúne el uso de IA realizado durante la preparación del proyecto, la migración a TypeScript, la implementación del consumo asíncrono, la presentación de los resultados y la documentación. Se presenta como un registro grupal: no atribuye consultas ni tareas a integrantes individuales.

El registro se elaboró a partir de la conversación disponible y de los intercambios adicionales aportados por el grupo. Los prompts entre comillas se transcriben respetando su redacción original. Cuando se reproduce solo una parte de un mensaje extenso, se indica que es un fragmento. Las respuestas se registran como **resúmenes**, salvo los fragmentos de código identificados como extractos; no se presentan como una transcripción íntegra de todas las conversaciones.

No se dispone del nombre verificable del modelo específico utilizado en cada intercambio ni de un registro completo de posibles consultas externas a las conversaciones aportadas. Por eso no se asignan versiones de modelo ni se inventan prompts o respuestas ausentes.

## Declaración de uso

Como grupo, declaramos que utilizamos IA de manera sustancial para apoyar el desarrollo del laboratorio. La asistencia incluyó generación de componentes y estilos completos, propuestas de arquitectura, configuración de TypeScript y ESLint, explicación del código, corrección de errores, comparación con la guía, preparación de pruebas, comandos de Git y redacción de documentación y textos para commits y pull requests.

La asistencia no se limitó a corregir ortografía ni a ofrecer sugerencias generales: varias respuestas proporcionaron implementaciones completas y reemplazos de archivos que se utilizaron como base para el trabajo. El grupo aplicó los cambios, realizó ajustes y gestionó su incorporación al repositorio. La integración de propuestas de IA no implica por sí sola que todas las pruebas manuales sugeridas hayan sido realizadas.

La responsabilidad sobre el contenido entregado y la capacidad de explicar el proyecto corresponde al grupo. Esta declaración informa el origen de la asistencia; no supone que la IA sea autora de la guía del curso ni de los datos proporcionados por la PokéAPI.

## Formas de utilización

| Uso de IA | Alcance de la asistencia | Archivos o resultados relacionados |
|---|---|---|
| Preparación y organización | Orientación sobre la base del proyecto, el campo de búsqueda y la distribución del trabajo en tres áreas. | Organización del laboratorio y plan de integración. |
| Componentes iniciales | Generación del buscador en JavaScript, consumo de la API mediante promesas y componente de detalle. | Versiones iniciales de `BuscadorPokemon.jsx` y `DetallePokemon.jsx`. |
| Migración a TypeScript | Conversión de JSX a TSX, tipado de estados, eventos y propiedades, configuración y puntos de entrada. | Componentes `.tsx`, `types.ts`, `tsconfig.json`, `vite-env.d.ts`, `main.tsx`, `index.html`, `package.json` y `eslint.config.js`. |
| Tipos y servicio HTTP | Definición del modelo de API y del modelo de interfaz, generación del servicio y transformación de datos. | `types.ts` y `services/pokemonService.ts`. |
| Control asíncrono | Generación de `useEffect`, búsqueda inicial, separación de estados, manejo de errores y cancelación. | `BuscadorPokemon.tsx`. |
| Presentación de estados | Generación de guard clauses, tarjeta, habilidades, listas con claves y roles de accesibilidad. | `DetallePokemon.tsx` y su integración con el buscador. |
| Diseño y estilos | Generación de CSS para formulario, tarjeta, estados, foco y adaptación a pantallas pequeñas. | `index.css`. |
| Resolución de errores | Diagnóstico de variable `raw` no declarada o fuera de alcance, tipos derivados y falta de TypeScript instalado. | Servicio HTTP e instalación de dependencias. |
| Revisión y comprobaciones | Comparación del repositorio con la guía, ejecución de verificaciones en una copia y propuesta de pruebas manuales. | Informes de revisión y listas de comprobación. |
| Git y colaboración | Comandos para ramas, commits y subida; títulos y descripciones de pull requests. | Historial y proceso de integración. |
| Documentación y estudio | Redacción de README, explicaciones conceptuales, respuesta de metacognición y elaboración de esta declaración. | `README.md`, `uso-ia.md` y material de preparación. |

## Registro de prompts y respuestas obtenidas

### 1. Construcción de los componentes iniciales

**Prompt textual aportado:**

> yo haré los componentes dame todo lo necesario para realizarlo

**Respuesta obtenida — resumen del intercambio aportado:**

Se entregó una versión de `BuscadorPokemon.jsx` con `useState` para ID, Pokémon, carga y error. El formulario consultaba `https://pokeapi.co/api/v2/pokemon/${id}` mediante `fetch`, comprobaba `res.ok` y utilizaba `.then()`, `.catch()` y `.finally()`.

También se proporcionó `DetallePokemon.jsx`, que recibía el Pokémon como propiedad y mostraba tipos, altura en metros, peso en kilogramos y estadísticas con una clave por nombre. Se explicó que la importación del componente de detalle requería que ese archivo existiera junto al buscador. Se indicó reiniciar el servidor mediante `Ctrl + C` y `npm run dev`.

**Aplicación:** base de los componentes iniciales en JavaScript, posteriormente migrados y reorganizados.

### 2. Migración de JavaScript a TypeScript

**Prompt textual:**

> https://github.com/CMardones06/laboratorio-frontend este es mi avance de la parte 1 de este taller pero accidentalmente lo hice con javascript en vez de typescript, ayudame a transformarlo adecuadamente, sin perder la informacion, para despues continuar con lo solicitado sin problemas

**Respuesta obtenida — resumen:**

Se revisaron el repositorio y la guía. Se propuso conservar el proyecto, instalar `typescript` y `typescript-eslint`, renombrar los cuatro componentes y puntos de entrada de `.jsx` a `.tsx`, crear `tsconfig.json` y `vite-env.d.ts`, definir `PokemonApiResponse` y tipar estados, eventos y propiedades.

La respuesta incluyó cambios para manejar imágenes que pueden ser `null`, comprobar la existencia del elemento `root`, actualizar la referencia a `main.tsx` en HTML y adaptar scripts y ESLint. Se conservó inicialmente el comportamiento de la búsqueda para separar la migración de los cambios asíncronos de la sesión 26.

**Extractos de las propuestas:**

```tsx
const [pokemon, setPokemon] = useState<PokemonApiResponse | null>(null);
const [error, setError] = useState<string | null>(null);
```

```json
"build": "tsc --noEmit && vite build",
"typecheck": "tsc --noEmit"
```

**Aplicación:** migración del proyecto y configuración de comprobaciones estáticas.

### 3. Comparación con la guía y distribución del trabajo

**Prompt textual:**

> ahora vuelve a analizar el repositorio, comparalo con la pauta y dime cuanto falta, necesito que separes las responsabilidades en tres ya que somos tres integrantes quienes van a estar trabajando en esto

**Respuesta obtenida — resumen:**

Se comparó el código con la guía y se identificaron como pendientes el servicio HTTP, un modelo separado para la interfaz, `useEffect`, la búsqueda confirmada, la carga inicial, `async/await`, la cancelación, los errores diferenciados, la presentación con guard clauses, las habilidades y los estilos.

Se propusieron tres áreas: tipos y servicio; formulario y control asíncrono; presentación y estilos. Se recomendó acordar primero el contrato de datos y conservar altura, peso y estadísticas. Esta división organizó la implementación grupal.

### 4. Tipos y servicio de la PokéAPI

**Prompt textual:**

> ayudame a dejar la primera parte lista para que despues trabajen mis compeñeros el resto

**Respuesta obtenida — resumen:**

Se entregó la interfaz `Pokemon` y el código completo de `fetchPokemon(query, signal): Promise<Pokemon>` en `src/services/pokemonService.ts`.

El servicio propuesto normaliza la búsqueda, rechaza entradas vacías, codifica el segmento de URL con `encodeURIComponent`, transmite `AbortSignal` a `fetch`, distingue errores de red, HTTP 404 y otros estados HTTP, espera la lectura del JSON y transforma la respuesta al modelo de interfaz. Se indicó conservar altura y peso en las unidades originales y convertirlas al mostrarlas.

**Extracto de la transformación propuesta:**

```ts
types: raw.types.map((item) => item.type.name),
abilities: raw.abilities.map((item) => item.ability.name),
imageUrl: raw.sprites.front_default,
stats: raw.stats.map((item) => ({
  name: item.stat.name,
  value: item.base_stat,
})),
```

Se explicó que una aserción de tipo describe lo esperado por TypeScript, pero no valida automáticamente el JSON recibido. La versión del manejo de errores conservó la causa original mediante `{ cause: error }` para satisfacer la regla de análisis estático encontrada durante la comprobación.

**Aplicación:** contrato utilizado por los componentes y centralización del acceso a la API.

### 5. Corrección del error de `raw`

**Entrada aportada al asistente — fragmentos de la salida de terminal:**

```text
src/services/pokemonService.ts:47:9 - error TS2304: Cannot find name 'raw'.
error TS7006: Parameter 'item' implicitly has an 'any' type.
Found 11 errors in the same file
```

**Respuesta obtenida — resumen:**

Se identificó que `raw` no estaba declarada o no era visible desde el `return`. Se indicó colocar la siguiente declaración dentro de `fetchPokemon`, después de las comprobaciones HTTP y antes del objeto de retorno:

```ts
const raw = (await response.json()) as PokemonApiResponse;
```

También se pidió comprobar la importación de `PokemonApiResponse`. Se explicó que los errores de los parámetros `item` eran consecuencia de no conocer el tipo de `raw`, por lo que no se propuso resolverlos agregando `any`.

**Aplicación:** corrección guiada del servicio.

### 6. Confirmación del avance y descripción de la parte 1

**Prompts textuales:**

> que le pongo en la descripcion

**Respuesta obtenida — resumen:**

Se indicaron los comandos para preparar `types.ts` y `pokemonService.ts`, crear un commit y subirlo. Se redactó una descripción de pull request que declaraba la incorporación del modelo, el servicio, la cancelación, los errores diferenciados y la transformación de datos. Se dejó explícito que aún faltaba conectar el servicio y adaptar la presentación.

### 7. Rama de trabajo e instalación de dependencias

**Prompt textual:**

> como puedo crear una nueva rama para esta parte

**Respuesta obtenida — resumen:**

Se propuso revisar el estado, actualizar `main` y crear `feature/busqueda-asincrona`. También se explicó cómo crear la rama directamente si ya había cambios sin confirmar y cómo subirla con seguimiento mediante `git push -u origin`.

**Entrada posterior — fragmento de terminal:**

```text
npm run typecheck
"tsc" no se reconoce como un comando interno o externo,
programa o archivo por lotes ejecutable.
```

**Respuesta obtenida — resumen:**

Se recomendó instalar las dependencias locales mediante `npm install` y volver a ejecutar la comprobación. Como alternativa si persistía el problema, se indicó `npm install -D typescript`. Se aclaró que no era necesario instalar TypeScript globalmente.

### 8. Descripción del pull request de la parte 2

**Prompt textual:**

> que le pongo en la descripcion del pull request de la parte 2?

**Respuesta obtenida — resumen:**

Se redactó una descripción de la integración del servicio con `useEffect`, la carga inicial, la separación del campo y la consulta, los estados, `try/catch/finally`, la cancelación y la adaptación de los detalles. Se señaló como pendiente la presentación final y se indicó incluir las comprobaciones solo si habían pasado.

### 9. Incorporación gradual de habilidades

**Prompt textual aportado:**

> empezemos el codigo

**Respuesta obtenida — resumen del intercambio aportado:**

Se indicó agregar debajo de los tipos un encabezado de habilidades y una lista generada con `.map()`. Se explicó el origen de `pokemon.abilities`, la función de `.map()` y el uso de `key={habilidad}`. También se aclaró que los nombres se muestran en inglés porque así los entrega la API.

**Extracto del código entregado:**

```tsx
<h4>Habilidades</h4>
<ul className="detalle__etiquetas">
  {pokemon.abilities.map((habilidad) => (
    <li key={habilidad}>{habilidad}</li>
  ))}
</ul>
```

**Aplicación:** incorporación de las habilidades a la tarjeta.

### 10. Guard clauses y presentación conjunta de estados

**Prompt textual aportado:**

> ahora que

**Respuesta obtenida — resumen del intercambio aportado:**

Se proporcionó una nueva versión completa de `DetallePokemon.tsx` que recibe `cargando`, `error` y `pokemon`. Se entregaron condiciones que devuelven primero carga, luego error y después `null` si no hay datos. El resultado exitoso incluye nombre, imagen, tipos, habilidades, medidas y estadísticas.

También se proporcionó el `return` del buscador con el formulario y esta llamada:

```tsx
<DetallePokemon
  cargando={cargando}
  error={error}
  pokemon={pokemon}
/>
```

Se pidió modificar ambos archivos conjuntamente para evitar errores de propiedades y quitar la tarjeta anterior del buscador para no duplicarla. Se sugirió probar los ID `1` y `99999`.

**Aplicación:** separación entre lógica de búsqueda y representación visual.

### 11. Generación de estilos

**Prompt textual aportado:**

> ahora que sigue

**Respuesta obtenida — resumen del intercambio aportado:**

Se entregó una hoja completa para `src/index.css`, con fondo claro, formulario flexible, botón verde, foco visible, estados diferenciados de carga, error y éxito, tarjeta, habilidades como etiquetas y estadísticas distribuidas en filas. Incluyó una media query para pantallas de hasta 480 píxeles.

Se explicó la función de los selectores `.App`, `.buscador__form`, `.estado--...`, `.detalle__etiquetas` y `@media`. Se recordó que `main.tsx` ya importa la hoja global y se recomendó comprobar el diseño al reducir el ancho de la ventana.

**Aplicación:** generación sustancial del CSS de la interfaz, incluyendo `text-transform: capitalize` y `max-width: 100%` en elementos de la tarjeta.

## Comprobaciones realizadas y límites de la evidencia

### Comprobaciones ejecutadas en el entorno de asistencia

En distintas etapas se descargó el repositorio a una copia de trabajo y se ejecutaron comandos de instalación, comprobación de tipos, compilación y lint. La revisión final de la implementación en el commit `1b897ea` obtuvo resultados satisfactorios con:

```bash
npm run typecheck
npm run build
npm run lint
```

Durante la preparación del servicio se hicieron comprobaciones con respuestas simuladas para revisar la transformación, normalización de consulta, transmisión de la señal, consulta vacía, HTTP 404, HTTP 500, error de red y propagación de cancelaciones. Esas comprobaciones no equivalen a una prueba completa con la PokéAPI real ni a una suite automatizada incorporada al repositorio.

En una comprobación del servicio apareció una regla de lint que exigía conservar la causa del error capturado; se ajustó la propuesta con `{ cause: error }`. Las respuestas generadas fueron, por tanto, objeto de revisión y corrección durante el acompañamiento.

## Propuestas, implementación y límites del proyecto

- La primera versión usaba JavaScript y cadenas de promesas. La versión posterior utiliza TypeScript y una consulta orquestada desde `useEffect` con `async/await`.
- Se conservaron imagen, tipos, medidas y estadísticas, y se agregaron habilidades.
- El servicio admite texto de búsqueda por ID o nombre, pero el campo de la interfaz revisada es numérico: no se declara implementada la búsqueda por nombre desde el formulario.
- Enviar el mismo ID no vuelve a ejecutar el efecto si `query` no cambia. No se declara implementado un mecanismo de reintento.
- `PokemonApiResponse` y `Pokemon` aportan tipado estático; no hay una validación completa del JSON en tiempo de ejecución.
- Las propuestas de usar un hook `usePokemon`, agregar un botón de reintento y crear `PokemonList` se identificaron como extensiones. No se declaran como funcionalidades implementadas.
- Las recomendaciones de redacción, formato o limpieza no necesariamente se aplicaron todas. El código del repositorio es la evidencia de la implementación final.

## Materiales proporcionados y fuentes

Para la asistencia se utilizaron el enlace al repositorio, la guía PDF de la sesión 26, fragmentos de código, salidas de terminal y conversaciones aportadas por el grupo. La IA ayudó a interpretar y organizar esos materiales.

Los datos de Pokémon proceden de la PokéAPI. La IA no se utilizó para inventar esos datos ni para sustituir la API por respuestas generadas dentro de la aplicación entregada. Las respuestas simuladas mencionadas se emplearon únicamente en comprobaciones del servicio.

## Responsabilidad grupal

Presentamos este registro para transparentar la participación de la IA en la generación, explicación, corrección y documentación del laboratorio. Reconocemos el carácter sustancial de la asistencia y asumimos la responsabilidad de revisar lo incorporado, contrastarlo con las instrucciones del curso y explicar su funcionamiento.

Este archivo es una declaración grupal del material disponible. Si se identifican otras consultas o usos no incluidos en las conversaciones aportadas, corresponde incorporarlos al registro antes de la entrega.
