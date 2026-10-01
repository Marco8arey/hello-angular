# Correcciones y conexión con Firebase

Documento de cambios realizados sobre el proyecto `mycv`. La documentación se mantiene
fuera del código fuente, tal como se solicitó.

Fecha: 2026-10-01

---

## 1. Resumen

El proyecto no compilaba debido a varios errores de sintaxis en TypeScript, un import
con ruta inexistente y una plantilla HTML mal cerrada. Se corrigieron todos los errores
detectados y se dejó la aplicación conectada a Firebase (Firestore) usando la
configuración provista.

Resultado:

- `npx tsc -p tsconfig.app.json --noEmit` finaliza sin errores.
- `npx ng build --configuration development` genera el bundle correctamente.

---

## 2. Errores corregidos

### 2.1 `src/app/app.module.ts`

- **Import con ruta inexistente**: `'../environments/enviroment'` (faltaba la `n`) se
  corrigió a `'../environments/environment'`.
- **Falta de coma** entre `AppRoutingModule` y `AngularFireModule.initializeApp(...)`,
  lo que rompía la compilación.
- Se añadió `AngularFirestoreModule` para disponer de Firestore en toda la app.
- El módulo ahora usa `environment.firebaseConfig`.

### 2.2 `src/app/models/header/header.model.ts`

- Línea con `photoUrl?: string = 'photo':;` → se eliminó el `:;` sobrante.
- Línea con `socialNetwork?: string = '@facebook':` → se cambió el `:` final por `;`.
- Se normalizó la indentación.

### 2.3 `src/app/services/header-service/header.service.ts`

- **String sin cerrar** en el import: `'@angular/fire/compat/firestore;` se corrigió a
  `'@angular/fire/compat/firestore'`.
- `return this.headerRef:` terminaba en `:` en lugar de `;`.
- Se eliminó una llave `}` sobrante al final de la clase.

### 2.4 `src/app/header/header.component.ts`

- El `constructor` terminaba en `;` en lugar de `{`; se reescribió el cuerpo completo.
- Error tipográfico `thisheaderService` → `this.headerService`.
- Error tipográfico `fata` → `data` (parámetro del `subscribe`).
- `this.header + data[0];` no asignaba nada. Ahora es
  `this.header = data[0] ?? new Header();`.
- Se eliminaron bloques `{ }` sueltos y llaves desbalanceadas.

### 2.5 `src/app/app.component.html`

- La celda de `app-languages` no cerraba su `<td>`. Se agregó `</td>` (afectaba la
  estructura de la tabla del layout).

### 2.6 Pruebas unitarias

- **`src/app/app.component.spec.ts`**: el test "should render title" buscaba un `<h1>`
  con "Hello, mycv" que no existe en la plantilla. Se reemplazó por una comprobación del
  `<table>` del layout y se agregó `CUSTOM_ELEMENTS_SCHEMA` para ignorar los componentes
  hijos no declarados.
- **`src/app/header/header.component.spec.ts`** y
  **`src/app/services/header-service/header.service.spec.ts`**: no proveían
  `AngularFirestore`, lo que provocaba `NullInjectorError`. Se añadió un `firestoreStub`
  que simula `collection().snapshotChanges()` mediante `of([])`.

### 2.7 Configuración de entornos

- **`src/environments/environment.ts`**: `production` estaba en `false`; ahora es `true`
  (es el archivo que se usa en el build de producción).
- **`src/environments/environment.development.ts`**: se mantiene `production: false`.
- Ambos archivos exportan la propiedad `firebaseConfig`.

### 2.8 `package.json`

- `firebase` se usaba (a través de `@angular/fire`) pero no estaba declarado como
  dependencia directa. Se agregó `"firebase": "^10.14.1"`, que es la versión instalada
  en `node_modules` y compatible con `@angular/fire@18`.

---

## 3. Conexión con Firebase

El proyecto usa la **API compat** de AngularFire (`@angular/fire/compat`), que ya estaba
presente en el código (`AngularFirestore`, `AngularFirestoreCollection`). Por eso se
mantuvo ese enfoque en lugar de migrar a la API modular (`firebase/app` + `initializeApp`).

La configuración provista quedó centralizada en los archivos de entorno:

`src/environments/environment.ts` (producción)

```ts
export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyDqTGnx8r7R83Yir7UCDwKYwLvTeYNGeP8",
    authDomain: "cv-interfaces.firebaseapp.com",
    projectId: "cv-interfaces",
    storageBucket: "cv-interfaces.firebasestorage.app",
    messagingSenderId: "363118191066",
    appId: "1:363118191066:web:ead422fa52e76b182560e3"
  }
};
```

`src/environments/environment.development.ts` (desarrollo) contiene el mismo
`firebaseConfig` con `production: false`.

La inicialización se hace en `src/app/app.module.ts`:

```ts
AngularFireModule.initializeApp(environment.firebaseConfig),
AngularFirestoreModule
```

> Nota: `angular.json` ya tenía configurado el `fileReplacements` que sustituye
> `environment.ts` por `environment.development.ts` en el build de desarrollo, por lo que
> ambas configuraciones funcionan sin cambios adicionales.

---

## 4. Comandos de verificación usados

```bash
npx tsc -p tsconfig.app.json --noEmit
npx ng build --configuration development
```

---

## 5. Pendientes / recomendaciones

- **Seguridad**: las credenciales de Firebase están versionadas en el repositorio. Las
  `apiKey` web de Firebase no son secretas por sí solas (la seguridad real se define en
  las reglas de Firestore), pero se recomienda aun así no subirlas directamente y
  gestionarlas con variables de entorno / `environment` no versionado.
- **Datos de Firestore**: la colección esperada es `/header` (definida en
  `HeaderService.dbPath`). Verifica que exista y tenga al menos un documento.
- **Pruebas**: los specs fueron ajustados con mocks, pero no se ejecutó `ng test` en este
  entorno (requiere Chrome/ChromeHeadless). Se recomienda correrlos localmente.
- **Componentes pendientes**: `education`, `skills`, `certificates`, `languages` e
  `interests` (y sus servicios) siguen vacíos, sin lógica ni conexión a Firestore.

---

## 6. Implementación del Tema 3 (servicios + Firestore)

Fecha: 2026-10-01 (segunda tanda de cambios).

Se implementaron las siete secciones del CV consumiendo sus colecciones de
Firestore, siguiendo el documento `Angular_Tema3_OpenCode.md` pero **con la
configuración de Firebase del usuario** (`cv-interfaces`), no la del instructor.

### 6.1 Colecciones, campos y modelos

Todos los campos son de tipo `string`. Los nombres respetan exactamente
mayúsculas y singular/plural con los que se crearon en Firestore (Firestore
distingue mayúsculas).

| Colección        | Tipo de lectura | Campos (además de `id`)                                                    | Modelo                                    |
| ---------------- | --------------- | -------------------------------------------------------------------------- | ----------------------------------------- |
| `header`         | documento único | name, goalLife, photoUrl, email, phoneNumber, location, socialNetwork       | `models/header/header.model.ts`           |
| `work-experience`| lista           | startDate, endDate, location, **Position** (P mayúscula), company, accomplishment | `models/work-experience/work-experience.model.ts` |
| `education`      | lista           | preparatoria, startDate, endDate, location                                  | `models/education/education.model.ts`     |
| `skills`         | lista           | backend, database, frontend, projectManager                                | `models/skills/skills.model.ts`           |
| `certificates`   | lista           | scrum, url                                                                  | `models/certificates/certificates.model.ts`|
| `languages`      | lista           | learned, process                                                            | `models/languages/languages.model.ts`     |
| `interests`      | lista (plural)  | art, physicists                                                             | `models/interests/interests.model.ts`     |

> Notas de nombres tal como los definió el usuario:
> - `work-experience.Position` empieza con mayúscula; el template usa `{{ job.Position }}`.
> - `work-experience.accomplishment` está en singular.
> - `interests.physicists` (no `physics`) y la colección `interests` va en plural.
> - `languages.process` (no `progress`).
> - `certificates`: el campo `scrum` contiene el nombre del certificado y `url` el enlace.

### 6.2 Servicios

Cada servicio (`src/app/services/*-service/*.service.ts`) sigue el patrón de
`HeaderService`: inyecta `AngularFirestore`, guarda la referencia de su colección
en el constructor y la expone con un método `get*()`.

### 6.3 Componentes y plantillas

Cada componente inyecta su servicio en el constructor y se suscribe a
`snapshotChanges()` con el operador `map` para construir la lista (o el
documento único en el caso de `header`) y asignarla a una propiedad.

- `header` -> `header: Header` (primer documento).
- Resto -> `workExperience: WorkExperience[]`, `education: Education[]`,
  `skills: Skills[]`, `certificates: Certificates[]`, `languages: Languages[]`,
  `interests: Interests[]`.
- Las plantillas usan `*ngFor` para las listas e interpolación `{{ }}`.

### 6.4 Desviación respecto al documento (decisión de implementación)

- El HTML de `header` se envolvió en una `<table>` propia, porque en
  `app.component.html` el componente ya está dentro de un `<td colspan="2">` y no
  es válido insertar un `<tr>` directamente dentro de un `<td>`.
- El `app.module.ts` incluye `AngularFirestoreModule`, que el documento omitía y
  cuya ausencia provoca `NullInjectorError: No provider for AngularFirestore!`.

### 6.5 Pruebas

Se actualizaron los 12 specs (6 servicios + 6 componentes) para proveer un
`firestoreStub` de `AngularFirestore`, evitando `NullInjectorError` al ejecutar
`ng test`. El stub devuelve `of([])` en `collection().snapshotChanges()`.

### 6.6 Verificación

```bash
npx tsc -p tsconfig.spec.json --noEmit
npx ng build --configuration development
```

Ambos finalizan sin errores. No se ejecutó `ng test` (requiere Chrome/ChromeHeadless
en este entorno).

---

## 7. Implementación del Tema 4 - Pruebas (TDD)

Fecha: 2026-10-01 (tercera tanda de cambios).

### 7.1 Configuración de Karma

`karma.conf.js` quedó con un único `browsers: ['ChromeHeadlessCI']` y su
`customLaunchers` correspondiente. El archivo previo tenía la clave `browsers`
duplicada, por lo que solo aplicaba la segunda.

### 7.2 Clases de ejemplo TDD

Se crearon clases con sus specs (contenido de ejemplo del tema, no relacionado con el CV):

- `src/app/compute/compute.ts` + `compute.spec.ts` (suma, resta, multiplicación, división).
- `src/app/greet/greet.ts` + `greet.spec.ts` (saludo con/sin nombre).
- `src/app/currencies/currencies.ts` + `currencies.spec.ts` (conversión y redondeo).

> Los PDFs solo muestran capturas de estos archivos; su implementación exacta no es
> legible por texto. El contenido se diseñó como decisión de implementación.

### 7.3 Pruebas de integración

Cada uno de los 7 servicios y 7 componentes ahora tiene dos pruebas:

- `should be created`.
- `get*()` / `service.get*()` devuelve la colección (no es nulo).

Con `firestoreStub` (mock de `AngularFirestore`) para no depender de la red.

### 7.4 Pruebas unitarias y de integración: resultado

No hay Chrome instalado en el equipo, pero sí **Microsoft Edge** (Chromium). Karma lanzó
las pruebas apuntando `CHROME_BIN` a Edge:

```bash
export CHROME_BIN="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
npx ng test --no-watch --no-progress --browsers=ChromeHeadlessCI
```

Resultado: **42/42 pruebas SUCCESS**.

### 7.5 Pruebas E2E con Cypress

- Instalado con `ng add @cypress/schematic` (`@cypress/schematic` 4.3.0, `cypress` 16.1.1).
- `cypress/e2e/spec.cy.ts` se adaptó para validar el CV real: layout, nombre del header
  (leído de Firestore), y secciones de work-experience, skills, languages e interests.
- El target `e2e` del schematic abre la GUI por defecto. Para ejecución automática se
  forzó `watch=false`. Además, el builder del schematic cancelaba el build en este
  entorno, por lo que se ejecutó Cypress directamente contra `ng serve`:

```bash
npx ng serve --port 4200 &
for i in $(seq 1 60); do curl -s -o /dev/null http://localhost:4200 && break; sleep 2; done
npx cypress run --e2e --browser electron
```

Resultado: **6/6 passing**.

---

## 8. Implementación del Tema 5 - Despliegue

### 8.1 Versión distribuible en `docs`

Se generó la versión de producción en `docs/` (requerida por GitHub Pages) y se movieron
los archivos de `docs/browser` a la raíz de `docs`, como indica el documento:

```bash
npx ng build --output-path=docs
mv docs/browser/* docs/
rmdir docs/browser
```

> El build muestra una advertencia de presupuesto (795 kB vs 512 kB de warning), pero no
> es un error y no impide el despliegue.

### 8.2 Workflow de GitHub Actions

Creado `.github/workflows/main.yml` a partir del documento, corrigiendo:

- Indentación YAML (el original estaba desalineado y no es válido).
- Versiones de acciones obsoletas: `actions/checkout@v2` -> `@v4`,
  `actions/setup-node@v1` -> `@v4` con Node 20.
- `npm run build --output-path=docs` -> `npm run build -- --output-path=docs`
  (sin `--`, npm no pasa el flag al script).
- Se agregó el `mv docs/browser/* docs/` después del build.

El workflow corre tests, build, login a Docker Hub, crea la imagen `httpd` con el sitio y
la publica en Docker Hub usando los secretos `DOCKER_USER` / `DOCKER_PASSWORD`.

### 8.3 Docker local

Docker está instalado (v29.8.1), pero **Docker Desktop no estaba iniciado**, por lo que no
se pudieron ejecutar los comandos `docker pull httpd`, `docker run`, `docker cp` y
`docker commit`. Los pasos quedan documentados en el tema y listos para ejecutar cuando el
daemon esté activo.

### 8.4 Pasos remotos (no ejecutables en local)

Requieren credenciales/cuentas y no se realizaron:

- Crear el repositorio `<usuario>.github.io` y `git push`.
- Configurar GitHub Pages (Settings -> Pages -> branch master / carpeta docs).
- Publicar la imagen en Docker Hub (`docker login` / `docker push`).
- Desplegar en Render (Existing image + Docker Hub).

### 8.5 Verificación

```bash
npx tsc -p tsconfig.spec.json --noEmit
npx ng build --configuration development
npx ng test --no-watch --no-progress --browsers=ChromeHeadlessCI   # 42/42
npx cypress run --e2e --browser electron                          # 6/6
```

---

## 9. Cierre T4 + T5 - resultados finales

### 9.1 Cobertura de código (T4)

```bash
export CHROME_BIN="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
npx ng test --no-watch --no-progress --browsers=ChromeHeadlessCI --code-coverage
```

Reporte en `coverage/mycv/index.html`:

- Statements: **94.53%** (121/128)
- Branches: **100%** (5/5)
- Functions: **86.27%** (44/51)
- Lines: **100%** (120/120)

### 9.2 Repositorio

- GitHub: `https://github.com/Marco8arey/hello-angular` (rama `master`).
- Nombre distinto a `<usuario>.github.io`, por lo que Pages es un *project page*.

### 9.3 GitHub Actions

- `.github/workflows/main.yml` con `actions/checkout@v5` y `actions/setup-node@v5`
  (Node 24) para eliminar la advertencia de deprecación de Node 20.
- Publica dos etiquetas de imagen: `:<sha>` y `:latest`.
- Secrets configurados: `DOCKER_USER`, `DOCKER_PASSWORD`.
- Runs verificados en verde: #1, #2, #3 y #4.

### 9.4 GitHub Pages

- Fuente: branch `master`, carpeta `/docs`.
- URL: `https://marco8arey.github.io/hello-angular/`
- Se compiló con `--base-href=/hello-angular/` y se agregó `docs/.nojekyll`.
- Verificado: `index.html`, `main-*.js`, `styles-*.css` y `foto.jpg` responden HTTP 200.

### 9.5 Docker Hub

- Imagen: `dankisu/mycv` con etiquetas `:latest` y `:<sha>`.

### 9.6 Render

- Web Service desde "Existing image": `docker.io/dankisu/mycv:latest`.
- Instance Type: Free. Environment Variables: vacío. Puerto detectado: 80 (httpd).
- URL: `https://mycv-latest-xoqu.onrender.com/`
- Para actualizar: **Manual Deploy -> Deploy latest image** (ya no hace falta cambiar
  el tag a mano, porque el workflow publica `:latest`).

### 9.7 Foto de perfil

- La imagen se guardó en `public/foto.jpg` (así viaja en el build de Pages y en la
  imagen Docker), en vez de usar un enlace compartido de Google Drive (que no es una
  URL directa y no funciona en un `<img>`).
- En Firestore, el campo `photoUrl` del documento `/header` debe valer exactamente
  `foto.jpg`.
- Plantilla del header: `<img>` con `object-fit: cover; border-radius: 50%` para avatar
  circular sin deformar.

### 9.8 URLs finales

- GitHub Pages: `https://marco8arey.github.io/hello-angular/`
- Render: `https://mycv-latest-xoqu.onrender.com/`
- Docker Hub: `https://hub.docker.com/r/dankisu/mycv/tags`
- Repositorio: `https://github.com/Marco8arey/hello-angular`