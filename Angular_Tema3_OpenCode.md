# Angular: Tema 3 - Servicios y consumo de Firestore

Fuente: FS_angular_AdolfoCenteno_T3.pdf, 50 páginas. Instructor: Adolfo Centeno Tellez.

## Indicaciones para OpenCode (añadidas para usar esta transcripción)

Lee el documento completo antes de modificar el proyecto. El objetivo es continuar el CV `mycv` y cargar sus siete secciones desde Firestore: header, work-experience, education, skills, certificates, languages e interests. Conserva el diseño y los componentes existentes. Primero revisa package.json y la estructura real del proyecto.

El material usa Node.js 20, Angular 18 y @angular/fire@18.0.1, con la API `compat`. No actualices versiones por el solo hecho de leer este documento. Los comandos con `$` representan instrucciones de terminal: el símbolo `$` no forma parte del comando. Los directorios /Users/adsoft pertenecen al ejemplo del instructor.

Los ejemplos de Firebase corresponden al instructor. Para implementar, utiliza la configuración del proyecto del usuario. Si faltan los valores, indícalo y deja marcadores claros; no conectes automáticamente al proyecto del ejemplo.

### Erratas e inconsistencias del PDF

- Páginas 5-6: el archivo es `header.service.ts` y la prueba `header.service.spec.ts`; algunas frases usan header-services.ts o header-service.spec.ts.
- Páginas 35-36: el objeto del entorno se llama `firebase`, pero app.module.ts usa `environment.firebaseConfig`. Hay que usar un nombre coherente; con los entornos transcritos corresponde `environment.firebase`.
- Las capturas de directorios muestran `app.config.ts` y `app.routes.ts`, mientras el texto configura `app.module.ts`. Revisa si el proyecto existente usa standalone o NgModule y adapta la integración a esa arquitectura.
- Página 42: crear el modelo de experiencia en `src/app/models/work-experience/work-experience.model.ts`, aunque el comando impreso lo sitúa dentro de header.
- Página 44: el HTML a editar es `src/app/work-experience/work-experience.component.html`, aunque el texto dice header.component.html.
- Página 26: la frase “3 campos” contradice su lista de siete campos de Header; se deben conservar los siete.
- Header contiene un documento. Work-experience contiene varios. El reto final pide al menos dos documentos en cada una de las otras cinco colecciones.
- Los esquemas de education, skills, certificates, languages e interests quedan como reto; el PDF no especifica sus atributos. Obtén los campos del diseño existente, o declara cualquier propuesta como decisión de implementación.
- El PDF presenta el modo de prueba de Firestore y sus reglas temporales como parte del ejercicio. La fecha mostrada es histórica; no copies su fecha de expiración literalmente.

## Criterios de finalización del ejercicio

1. Crear las siete colecciones con campos que correspondan a sus modelos.
2. Crear modelos, servicios e inyectar los servicios en los componentes.
3. Leer Header como un documento y las otras secciones como listas.
4. Mostrar los datos en cada HTML; usar la iteración correspondiente para listas.
5. Completar las cinco secciones del reto con al menos dos documentos por colección.
6. Comprobar la aplicación con `ng serve` y reportar cualquier configuración pendiente.

## Transcripción del documento

Se conserva el orden de las 50 páginas. El texto de las capturas se inserta en el lugar de la imagen. Los ejemplos principales de código se han normalizado para eliminar errores de reconocimiento y números de línea. Las capturas de interfaz y terminal incluyen texto obtenido por OCR: pueden contener caracteres imperfectos y valores cortados; se marcan como tales. No se inventan los valores que quedan fuera de una captura. Se omiten logotipos y pies de página repetidos.


## Página 1

Nombre del

instructor

Adolfo Centeno Tellez

Área temática 
Ciencia de datos  
Rol 
Data Scientist 
Competencia 
Full Stack 
Subcompetencia 
Frontend 
Objetivo

Módulo 
Conocimiento

Módulo Conocimiento  (5h en total ) 
 
Duració
n

Objetivos 
Subtemas

Tema 3 - Concepto 
de Service y 
consumo de una 
API en Angular

1 hora 
Definir el concepto de Service 
en Angular, crear una Service 
básico que consuma una base 
de datos en la nube para 
realizar las operaciones 
básicas de lectura de una base 
de  datos no relacional.

1.- Concepto y 
creación de  
Services en 
Angular

2.- Creación de 
Services que 
permitan la 
conectividad a 
una base de 
datos de Google 
Firestore

Introducción al tema

En los temas anteriores se creó el ambiente de desarrollo para Angular, formado 
por git, nodejs 20.0 y Angular 18.0. Además se creó un proyecto en Angular  
llamado mycv, se crearon los componentes necesarios para crear nuestro propio 
CV al estilo de Ellon Musk

Al finalizar este módulo crearás una base de datos  no relacional llamada 
Firestore,  crearas las estructuras de datos para cada uno de los componentes del 
proyecto. Entenderás el concepto  de  Servicio, serás capaz  de  crear los


## Página 2

servicios   usando  angular  CLI, codificarlas cada servicio para recuperar los 
datos para el llenado de cada componente, modificaras los componentes para 
inyectar los servicios y visualizar la información.

SUBTEMA 1: Concepto y creación de  Services en Angular  
 
Angular es un framework basado  en componentes. Pero existen otros tipos de 
artefactos que podemos usar para organizar el código de nuestras aplicaciones 
de una manera más lógica y fácil de mantener.

Los servicios son de  igual importancia a los componentes, en esta sección  
iniciamos con la descripción de los servicios o "services", son una de las piezas 
fundamentales en el desarrollo de aplicaciones Angular. Veremos qué es un 
servicio y cómo dar nuestros primeros pasos en su creación y utilización en un 
proyecto.

Básicamente un servicio lo podemos definir como  un proveedor de datos, que 
mantiene lógica de acceso a ellos, los servicios son consumidos por los 
componentes, que delegan en ellos la responsabilidad de acceder a la 
información y la realización de operaciones con los datos.

Para crear un servicio usamos el Angular CLI con el comando

● ng generate service <service-name>

Para nuestro  proyecto, crearemos  servicios  que  nos permitirán conectarnos a 
una base de datos de Firestore.

Nos aseguramos que estemos en la raíz de nuestro proyecto (debemos tener a  la 
vista node_modules y package.json) :

$ ls -la


## Página 3

Ahora nos  movemos a la carpeta src/app, ejecutamos el comando ls -la  para 
verificar que estemos en la carpeta del código de la aplicación.

$ cd src/app

$ ls -la

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
[> mycv git:(master) x ls -la

total 1016

drwxr-xr-x 17 adsoft staff 544 Nov 18 18:03 .

drwxr-x---+ 79 adsoft staff 2528 Dec 19 13:52 ..

drwxr-xr--x 3 adsoft staff 96 Nov 18 18:03 .angular
-rw-r--r--- 1 adsoft staff 274 Nov 18 16:24 .editorconfig
drwxr-xr-x 12 adsoft staff 384 Nov 18 16:26 .git

-rw-r--r--- 1 adsoft staff 587 Nov 18 16:24 .gitignore
drwxr-xr-x 5 adsoft staff 16@ Nov 18 16:24 .vscode
-rw-r--r-- 1 adsoft staff 1065 Nov 18 16:24 README.md
-rw-r--r-- 1 adsoft staff 2582 Nov 18 16:24 angular.json
drwxr-xr-x 567 adsoft staff 18144 Nov 18 16:26 node_modules
-rw-r--r-- 1 adsoft staff 484245 Nov 18 16:26 package-lock.json
-rw-r--r-- 1 adsoft staff 1035 Nov 18 16:24 package.json
drwxr-xr-x 3 adsoft staff 96 Nov 18 16:24 public

drwxr-xr-x 6 adsoft staff 192 Nov 18 16:24 src

-rw-Yr--r-- 1 adsoft staff 424 Nov 18 16:24 tsconfig.app.json
-Yw-Lr--r-- 1 adsoft staff 1021 Nov 18 16:24 tsconfig.json
-Yw-Lr--r-- 1 adsoft staff 434 Nov 18 16:24 tsconfig.spec.json
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
[> mycv git:(master) x cd srce/app

[> app git:(master) x ls -la

total 40

drwxr-xr-x 15 adsoft staff 480 Nov 19 16:54 .

drwxr-xr-x 6 adsoft staff 192 Nov 18 16:24 ..

-rw-Yr--r-- 1 adsoft staff @ Nov 18 16:24 app.component.css
-rw-Yr--r-- 1 adsoft staff 420 Nov 19 16:54 app.component.html
-rw-Yr--r-- 1 adsoft staff 910 Nov 18 16:24 app.component.spec.ts
-rw-Yr--r-- 1 adsoft staff 957 Nov 19 14:08 app.component.ts
-rw-Yr--r-- 1 adsoft staff 310 Nov 18 16:24 app.config.ts
-rw-Yr--r-- 1 adsoft staff 77 Nov 18 16:24 app.routes.ts
drwxr-xr-x 6 adsoft staff 192 Nov 18 23:39 certificates
drwxr-xr-x 6 adsoft staff 192 Nov 18 23:34 education
drwxr-xr-x 6 adsoft staff 192 Nov 18 23:22 header

drwxr-xr-x 6 adsoft staff 192 Nov 18 23:42 interests
drwxr-xr--x 6 adsoft staff 192 Nov 18 23:41 languages
drwxr-xr-x 6 adsoft staff 192 Nov 18 23:36 skills

drwxr-xr-x 6 adsoft staff 192 Nov 18 23:31 work-experience

+ app git:(master) x jj
```


## Página 4

Ahora, creamos una carpeta especial para nuestros servicios  y  nos   movemos 
dentro  de la carpeta.

$  mkdir services

$ cd  services

Una vez dentro services, creamos una carpeta para cada uno de los servicios que  
crearemos. Para efectos didácticos crearemos  un servicio para  cada sección  de 
nuestro  CV, así en la siguiente sección  programaremos cada servicio para 
recuperar información específica para cada componente de la aplicación.

$ mkdir header-service

$ mkdir work-experience-service

$ mkdir  education-service

$ mkdir skills-service

$ mkdir certificates-service

$ mkdir  languages-service

$ mkdir interests-service

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
[> app git:(master) x mkdir services

[> app git:(master) x cd services

I> services git:(master) x ls --la

total @

drwxr-xr-x 2 adsoft staff 64 Dec 19 14:07 .
drwxr-xr-x 16 adsoft staff 512 Dec 19 14:07 ..
+ services git:(master) x Jj
```


## Página 5

Hasta ahora tenemos la estructura  para cada servicio dentro de services, 
procedemos a crear cada servicio dentro de  la carpeta correspondiente.

$ ng  generate service header-service/header

Nos creará 2 archivos dentro de la carpeta header-service: header-services.ts 
tipo Typescript, podemos visualizarlo con:

$ cat header-service/header.service.ts

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
I> services git:(master) x mkdir header-service

|> services git:(master) x mkdir work-experience-service

l> services git:(master) x mkdir education-service

l> services git:(master) x mkdir skills-service

I> services git:(master) x mkdir certificates--service

l> services git:(master) x mkdir languages-service

> services git:(master) x mkdir interests-service

[> services git:(master) x ls --la

‘total @

drwxr-xr-x 9 adsoft staff 288 Dec 19 14:25 .

drwxr-xr-x 16 adsoft staff 512 Dec 19 14:07 ..

drwxr-xr-x 2 adsoft staff 64 Dec 19 14:25 certificates-service
drwxr-xr-x 2 adsoft staff 64 Dec 19 14:25 education-service
drwxr-xr--x 2 adsoft staff 64 Dec 19 14:24 header-service
drwxr-xr-x 2 adsoft staff 64 Dec 19 14:25 interests-service
drwxr-xr--x 2 adsoft staff 64 Dec 19 14:25 languages-service
drwxr-xr-x 2 adsoft staff 64 Dec 19 14:25 skills-service
drwxr-xr-x 2 adsoft staff 64 Dec 19 14:25 work-experience-service
[> services git:(master) x pwd
/Users/adsoft/mycv/src/app/services

+ services git:(master) x Jj
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
[> services git:(master) x ng generate service header-service/header
CREATE src/app/services/header-service/header.service.spec.ts (357 bytes)
CREATE src/app/services/header-service/header.service.ts (135 bytes)

» services git:(master) x fj
```


## Página 6

Además crea su correspondiente archivo para generar sus pruebas unitarias (que 
se analizará en el tema 4) header.service.spec.ts.

$ cat header-service/header-service.spec.ts

Hemos creado el service para header, repetimos el proceso para el resto de los 
componentes.

$ ng  generate service work-experience-service/work-experience

Texto de la captura (código transcrito):

```
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class HeaderService {
  constructor() { }
}
```

Texto de la captura (código transcrito):

```
import { TestBed } from '@angular/core/testing';
import { HeaderService } from './header.service';
describe('HeaderService', () => {
  let service: HeaderService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```


## Página 7

$ ng  generate service  education-service/education

$ ng  generate service skills-service/skills

$ ng  generate service certificates-service/certificates

$ ng  generate service  languages-service/languages

$ ng  generate service interests-service/interests

Inyección  de dependencias.

Ahora, analizaremos Angular y la inyección de dependencias, que vamos a usar 
para poder disponer del servicio en un componente.

Como en otros frameworks, en Angular la inyección de dependencias se realiza 
por medio del constructor. En el constructor del componente, que hasta ahora 
habíamos dejado siempre vacío, podemos declarar cualquiera de los servicios

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
> services git:(master) x ng generate service work-experience-service/work-experience
CREATE src/app/services/work-experience-service/work-experience.service.spec.ts (398 bytes)
CREATE src/app/services/work--experience-service/work-experience.service.ts (143 bytes)

+ services git:(master) x Jj
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
|> services git:(master) x ng generate service education-service/education
CREATE src/app/services/education-service/education.service.spec.ts (372 bytes)
CREATE src/app/services/education-service/education.service.ts (138 bytes)

+ services git:(master) x Jj
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
> services git:(master) x ng generate service skills-service/skills
CREATE src/app/services/skills-service/skills.service.spec.ts (357 bytes)
CREATE srce/app/services/skills--service/skills.service.ts (135 bytes)

+ services git:(master) x §
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
(> services git:(master) x ng generate service certificates-service/certificates
CREATE src/app/services/certificates-service/certificates.service.spec.ts (387 bytes)
CREATE src/app/services/certificates-service/certificates.service.ts (141 bytes)

+ services git:(master) x Jj
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
>» services git:(master) x ng generate service languages-service/languages
CREATE src/app/services/languages-service/languages.service.spec.ts (372 bytes)
CREATE src/app/services/languages-service/languages.service.ts (138 bytes)

+ services git:(master) x Jj
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
|> services git:(master) x ng generate service interests-service/interests
CREATE src/app/services/interests-service/interests.service.spec.ts (372 bytes)
CREATE src/app/services/interests-service/interests.service.ts (138 bytes)

+ services git:(master) x Jj
```


## Página 8

que vamos a usar y que Angular se encargará de proporcionar, sin que tengamos 
que realizar nosotros ningún trabajo adicional.

Esto es tan sencillo como declarar como parámetro la dependencia en el 
constructor del componente

Ahora, inyectamos HeaderService en el componente Header, empezaremos 
actualizando  
header-service.ts, agregamos la línea 7, con una variable 
accesoHeader, que después vamos a visualizar en el componente Header.

$ nano header-service/header.service.ts

Actualizamos el componente Header con el código  necesario para inyectar el 
service. Empezamos importando el servicio.

Crearemos una constructor para crear una instancia pública del service.

Texto de la captura (código transcrito):

```
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class HeaderService {
  accesoHeader = 'header service running...';
  constructor() { }
}
```

Texto de la captura (código transcrito):

```
import { HeaderService } from '../services/header-service/header.service';
```

Texto de la captura (código transcrito):

```
constructor(public headerService: HeaderService) {
  console.log(this.headerService);
}
```


## Página 9

Para implementar la inyección del servicio, regresamos un nivel para estar en 
src/app con  cd ..

$ cd ..

$ nano header/header.component.ts

Para comprobar, imprimimos  la variable accesoHeader, en el HTML de header 
usando la directiva de angular {{ }}, que permite visualizar cualquier variable u  
objeto TypeScript dentro del HTML.zw

$ nano header/header.component.html

Usando Angular CLI, arrancamos en modo frontend usando el comando ng serve, 
visualizamos la aplicación en la dirección: http://localhost:4200, asi validamos que

Texto de la captura (código transcrito):

```
import { Component } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public headerService: HeaderService) {
    console.log(this.headerService);
  }
}
```

Texto de la captura (código transcrito):

```
<p>header works!</p>
<p>{{headerService.accesoHeader}}</p>
```


## Página 10

el servicio está insertado en el componente Header, visualizando la variable 
accesHeader en el HTML.

Repetimos el proceso para el servicio work-experience, nos aseguramos de estar 
en la carpeta services.

$ nano work-experience-service/work-experience.service.ts

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
header works!
header service running...
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
I> services git:(master) x pwd

/Users/adsoft/mycv/src/app/services

I> services git:(master) x ls -la

total @

drwxr-xr-x 9 adsoft staff 288 Dec 19 14:25 .

drwxr-xr-x 16 adsoft staff 512 Dec 19 14:07 ..

drwxr-xr-x 4 adsoft staff 128 Dec 20 00:20 certificates-service
drwxr-xr-x 4 adsoft staff 128 Dec 20 00:19 education-service
drwxr-xr-x 4 adsoft staff 128 Dec 20 01:19 header-service
drwxr-xr-x 4 adsoft staff 128 Dec 20 00:21 interests-service
drwxr-xr-x 4 adsoft staff 128 Dec 20 00:20 languages-service
drwxr-xr-x 4 adsoft staff 128 Dec 20 00:19 skills-service
drwxr-xr-x 4 adsoft staff 128 Dec 20 00:18 work-experience-service
+ services git:(master) x §
```


## Página 11

Ahora modificamos el componente WorkExperience 
$  cd .. 
$  nano work-experience/work-experience.component.ts

Visualizamos la variable workExperienceService en el html del componente. 
 
$  nano work-experience/work-experience.component.html

Probamos nuevamente la aplicación con:  
 
$ ng serve

Texto de la captura (código transcrito):

```
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class WorkExperienceService {
  accesoWorkExperience = 'work experience running...';
  constructor() { }
}
```

Texto de la captura (código transcrito):

```
import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css'
})
export class WorkExperienceComponent {
  constructor(public workExperienceService: WorkExperienceService) {
    console.log(this.workExperienceService);
  }
}
```

Texto de la captura (código transcrito):

```
<p>work-experience works!</p>
<p>{{workExperienceService.accesoWorkExperience}}</p>
```


## Página 12

Hasta ahora, hemos trabajado con services, hemos creado servicios  para  los 
componente header y  work-experience. Además hemos inyectado los servicios 
en sus respectivos componentes y visualizado en el HTML del componente. 
 
Sala de inspiración 
 
 
El conocimiento que  has adquirido hasta ahora, te permite  construir e inyectar 
servicios en  Angular.

● Como tarea adicional crea los servicios para los las secciones de:

education, skills, certificates, languages e interests 
● Una vez creado los servicios  inyecta cada servicio en su  respectivo

componente  
● Modifica el html de cada componente para visualizar la variable del servicio 
● Comprueba si puedes visualizar la aplicación de forma local, verifica con:

ng  serve 
  
  
 
 
Sala de pruebas

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
< ie Q @ localhost:4200
header works!
header service running...
work-experience works!

skills works!
work experience running...
education works! certificates works!
languages works! interests works!
```


## Página 13

Lee cada una de las preguntas y selecciona la respuesta que consideres correcta 
de acuerdo a tu experiencia hasta ahora.

1. ¿ Con qué comando de Angular CLI generamos un service

llamado data-service ?

Opción a:  
 ng g c data-service

Incorrecta: 
 
La sintaxis correcta es: 
 
$  ng generate service 
data-service 
 
Opción b:  
  
 ng generate data-service

Incorrecta: 
 
La sintaxis correcta es: 
 
$  ng generate service 
data-service 
 
Opción c:  
 
 ng generate component data-service

Incorrecta:  
 
La sintaxis correcta es: 
 
$  ng generate service 
data-service 
 
Opción d:  
 ng generate service data-service

CORRECTA:   
 
La sintaxis correcta es: 
 
$  ng generate service 
data-service

2. ¿ Qué archivos generaría el comando anterior ?

Opción a:  
  
data-service.spec.ts 
data-service.ts

Incorrecta 
 
El comando  ng generate service 
data-service creará los archivos: 
 
data-service.service.spec.ts 
data-service.service.ts


## Página 14

Opción b:  
  
data-service.spec.ts 
data-service.service.ts

Incorrecta 
 
El comando  ng generate service 
data-service creará los archivos: 
 
data-service.service.spec.ts 
data-service.service.ts 
 
Opción c:  
  
data-service.service.spec.ts 
data-service.service.ts

CORRECTA 
 
El comando  ng generate service 
data-service creará los archivos: 
 
data-service.service.spec.ts 
data-service.service.ts 
 
 
Opción d:  
 
data-service.component.spec.ts 
data-service.component.ts

Incorrecta:  
 
El comando  ng generate service 
data-service creará los archivos: 
 
data-service.service.spec.ts 
data-service.service.ts 
 
 
3.-  ¿ Cómo imprimes en el html de un  componente la instancia del 
servicio  llamada: dataService.hello ?

Opción a:  
  
 { dataService.hello }

Incorrecta: 
 
La sintaxis correcta es: 
 
{{ dataService.hello }} 
 
 
Opción b:  
  
 console.log(dataService.hello)

Incorrecta: 
 
La sintaxis correcta es: 
 
{{ dataService.hello }}


## Página 15

Opción c:  
  
{{ dataService.hello }}

CORRECTA 
 
La sintaxis correcta es: 
 
{{ dataService.hello }} 
 
Opción d:  
 
<h3> dataService.hello </h3>

Incorrecta: 
 
La sintaxis correcta es: 
 
{{ dataService.hello }} 
 
 
 
 
 
 
SUBTEMA 2:  Creación de Services que permitan la conectividad a una base de 
datos de Google Firestore

En este tema crearemos servicios para conectar nuestra aplicación a una base de 
datos no relacional Firestore que es parte de la Plataforma como Servicio (PaaS) 
llamada Google firebase disponible en https://console.firebase.google.com/


## Página 16

Firebase de Google es una plataforma en la nube para el desarrollo de 
aplicaciones web y móviles. y se encuentra actualmente disponible para 
distintas plataformas como iOS, Android, web, flutter y Unity.  
 
Firebase fue creada en 2011 pero pasó a ser parte de Google en 2014, 
comenzando como una base de datos en tiempo real. Sin embargo, se añadieron 
más y más funciones que, en parte, permitieron agrupar los SDK de productos de 
Google con distintos fines, facilitando su uso. 
 
Firebase es la forma más sencilla de crear aplicaciones web y móviles, 
procurando que el trabajo sea más rápido, pero sin renunciar a la calidad 
requerida y que es especialmente interesante para que los desarrolladores no 
dediquen tanto tiempo al backend, tanto en cuestiones de desarrollo como de 
mantenimiento. 
 
Asimismo, la plataforma Firebase está compuesta por una suite de productos:

1. Real Time.- Firebase Realtime es una base de datos NoSQL alojada en la

nube que te permite almacenar y sincronizar datos en tiempo real. La 
sincronización en tiempo real permite que los usuarios accedan a sus datos 
desde cualquier dispositivo, web o móvil, con facilidad, y los ayuda a 
trabajar en conjunto. Si un  usuario pierde conectividad de internet, los SDK 
de Realtime Database usan la caché local del dispositivo para publicar y 
almacenar cambios y cuando el dispositivo se conecta, los datos locales se 
sincronizan de manera automática.

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
<>cC 1] % _https://console.firebase.google.com/u/0/ Q o|ea S O & & even =
© Firebase ®
< TO)
6 & G
Recent projects < +
)
; -
admisiones-uv 7 iO)
+ admisiones-uv .
- Create a project P *
heart-model antlr-front
heart-model-f6c36 antlr-front
“0:
-
```


## Página 17

2. Cloud Firestore.- Cloud Firestore te permite almacenar, sincronizar y

realizar búsquedas inteligentes de  datos en una arquitectura altamente 
escalable, Firestore se analizará a profundidad en este módulo ya que es el 
producto de firebase ideal para nuestra aplicación web.

3. Firebase ML.- Firebase ML es un producto que incorpora un conjunto de

APIs de inteligencia artificial para los casos de uso más comunes como: 
reconocer texto, etiquetar imágenes y reconocer puntos de referencia. A 
diferencia de otras API integradas en el dispositivo, estas aprovechan la 
potencia de la tecnología de aprendizaje automático de Google Cloud para 
brindarte un nivel alto de precisión. Simplemente se transfieren los datos a 
la API y se creará una solicitud sin interrupciones para los modelos que se 
ejecutan en Google Cloud  y recibirás la información que necesitas con 
pocas líneas de código

4. Cloud functions.- Cloud Functions te permite crear funciones de backend

en JavaScript para resolver problemas específicos, las cuales se ejecutan 
en un entorno de Node.js seguro y administrado y  solo se ejecutan cuando 
se emite un evento específico bajo observación. Cloud functions se activan 
con productos de Firebase, como cambios en los datos de Realtime 
Database, el registro de usuarios nuevos mediante Auth o los eventos de 
conversión en Analytics

5. Hosting.- Con Firebase Hosting, puedes publicar un sitio web completo sin

complicaciones solo contando con la versión de producción en HTML, CSS 
y Javascript, sin importar el framework con el que fueron creados como 
Jquery, Angular, React o Vue. El contenido se publica rápidamente, sin 
importar la ubicación del usuario, los archivos implementados en Firebase 
Hosting se almacenan en servidores en la nube de Google.

6. Cloud Storage.- Cloud Storage es un servicio de almacenamiento de

objetos como imágenes, videos, audios, pdf, xml, entre otros. Es potente, 
simple y rentable, este servicio agrega seguridad a las operaciones de 
carga y descarga de archivos de las aplicaciones de Firebase, sin importar 
la latencia de la red.

Al igual que Firebase Realtime, Firestore mantiene tus datos sincronizados entre 
apps cliente a través de objetos que escuchan en tiempo real y ofrece soporte sin 
conexión para dispositivos móviles y la Web, por lo que puedes compilar apps con 
capacidad de respuesta que funcionan sin importar la latencia de la red ni la 
conectividad a Internet. Explicas que Firestore también ofrece una integración sin 
interrupciones con otros productos de Firebase y Google Cloud, incluido el 
Storage y Cloud Functions.


## Página 18

Crear una cuenta en Firebase 
 
Como primer paso ir a la consola de administración de firebase : 
https://console.firebase.google.com/ 
 
NOTA: Si ya te encuentras logueado con alguna cuenta de gmail o institucional, 
Firebase tomará esta cuenta como tu cuenta por default para Firebase.

En caso contrario, te pedirá que te registres con alguna cuenta de correo 
electrónico, la recomendación sería usar la misma cuenta que usaste para Github. 
 
Crear un proyecto  
 
Como primer paso, crearemos un proyecto haciendo click en el botón “Crear un 
proyecto”, después pondremos un nombre y firebase generará un ID único.

Para nuestro ejemplo, crearemos un proyecto que almacene la información para 
cada sección de nuestro proyecto de CV.

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
€ CG @ console-firebase.google.com/u/0/ ahr #6
tec.mx administra esta cuenta.
@
ADOLFO CENTENO TELLEZ
a.centeno@tec.mx
Administrar tu
Cuenta de Google
waves cloud erp
waves.cloud.erp@gmail.com
tutor inteligente
tutor.inteligente.tec@gmail.com
adsoftsito
adsoftsito1 @gmail.com
& Agregar otra cuenta
```


## Página 19

Posteriormente deshabilitamos Google Analytics ya que esta funcionalidad no 
es requerida para este proyecto, y hacemos clic en “Crear proyecto”

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
€ > @ Q %  console.firebase.google.com/u/0/ Q a i A
x Create a project
Let's start with a name for
your project °
my-cv
@ my-cv-e292F
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
€ C  @ console.firebase.google.com/u/0/
X Crear un proyecto(paso 2 de 2)
Google Analytics habilita las siguientes funciones:
X Priebas AB © (ete nnn ec
X  Segmentaciénde usuarios y @® X  Aetivaderes-de Cloud Functions @®
fot ee i fee
wee
X  Informesitimitades y gratuites ®
X = Prediccién-detcompertamiento-detes @
coe
B® Habilitar Google Analytics para este proyecto
Recomendado
mer
```


## Página 20

Click en Crear proyecto, posteriormente clic en Continuar y nos aparecerá la 
consola de administración de nuestro proyecto

Crear una base de datos 
 
Antes de crear nuestra base de datos en Firestore, analizaremos algunos 
conceptos del modelo de datos de Firebase.

Cloud Firestore es una base de datos NoSQL orientada a los documentos. A 
diferencia de una base de datos SQL, no hay tablas ni filas; En su lugar, 
almacenas los datos en documentos, que se organizan en colecciones.

Cada documento contiene un conjunto de pares clave-valor. Cloud Firestore está 
optimizado para almacenar grandes colecciones de documentos pequeños.

Todos los documentos se deben almacenar en colecciones, y pueden contener 
subcolecciones y objetos anidados. Además, ambos pueden incluir campos 
primitivos, como strings, o tipos de objetos complejos, como listas.

Documentos

En Cloud Firestore, la unidad de almacenamiento es el documento. Un 
documento es un registro que usa pocos recursos y contiene campos con valores

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
<€>e Q °% console.firebase.google.com/u/0/project/my-cv-e292f/overview Q oO & 7% 3S OO f& & eveN =
© Firebase my-cv ¥ e@
(Ce eoere a) @
my-Cv [E% Getting started? Tell Gemini about your project ~
Generative Al
$32 1 app + Add app +
+> Build with Gemini
@ Genkit (ar) Build = ©
Project shortcuts
B Firestore
A Firestore Database
Reads (current) Writes (current)
Product categories re) re)
Build v 50 2
Run v
Analytics v 25 1
33 All products
0 SPSS SSSPSsss e 0 SOS SPSS SSSsss e
Grew Dec 22 Dec23 Dec24 Dec25 Dec26 Dec27 Dec 28 Dec 22 Dec23 Dec24 Dec25 Dec26 Dec27 Dec 28
par!
No-cost ($0/month) Wirgteacte - Thisweek - -Last week
ae
< “0:
4
```


## Página 21

asignados. Cada documento se identifica con un nombre específico o bien un ID 
generado automáticamente.

Por ejemplo un documento que representa a un registro de names ( con  los 
atributos index,  nombre y sexo de una  persona)  puede tener el siguiente 
aspecto:

Cloud Firestore es compatible con diversos tipos de datos para los valores, como 
booleanos, números, strings, puntos geográficos, BLOB binarios y TimeStamp. 
Además, puedes usar arreglos u objetos anidados, llamados mapas, para 
estructurar datos dentro de un documento.

Un documento en Firestore es muy similar a un JSON; de hecho, básicamente 
son JSON. Existen algunas ligeras diferencias (como que los documentos en 
Firebase admiten tipos de datos adicionales y su tamaño se limita a 1 MB), pero 
regularmente se puede considerar los documentos como registros JSON.

Colecciones

Los documentos viven en colecciones, que simplemente son contenedores de 
documentos. Por ejemplo, podrías tener una colección llamada names con 
diversos registros de nombres con un ID unico, en la que haya un documento que 
represente a cada uno:

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
index: 314
name: "Priscilla"
sex: ‘FY
```


## Página 22

En Cloud Firestore tienes libertad total sobre los campos que pones en cada 
documento y los tipos de datos que almacenas en esos campos.

NOTA: Los documentos dentro de una misma colección pueden contener 
campos diferentes o almacenar distintos tipos de datos en esos campos. 
Sin embargo, se recomienda usar los mismos campos y tipos de datos 
en varios documentos, de manera que puedas consultarlos con mayor 
facilidad.

Los nombres de documentos dentro de una colección son únicos. Puedes 
proporcionar tus propias claves, como los ID de usuario, o puedes dejar que 
Cloud Firestore cree ID aleatorios de forma automática.

No es necesario crear ni borrar las colecciones; Cuando se crea el primer 
documento de una colección, esta se crea automáticamente y por el contrario si 
borras todos los documentos de una colección, esta deja de existir.

Una vez revisado estos conceptos básicos sobre base de datos en firebase, 
creamos nuestra primera base de datos en Cloud Firestore. Seleccionamos del 
menú del lado izquierdo Firestore Database.

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
+ Iniciar coleccién + Agregar documento + Iniciar coleccién
names > e7tturoxwuuchyjixive = Fy Agregar campo

@9YEpSre6ka3Pzr6VeYW index: 74
@DUM7LTXBCeLKUjMCHUB > name: "Caroline"
@M7kuYNEMmQFUSQBIppu sexs oF
@MAfiMal410Q2Fgo3EXT
@W9apk3G7UN7r94nbsLm
15E5JYwqDdMImx3oROyn
16LnmXoe4sDyyMwthRZN
1T9n2XX7AiKbSPLJOMEJ
‘1Mg2A99Ta6C jqmuKK6L4
ThLigVGrsBFKGdx7veqd
‘InM7DC3 jMSUcTWadDEew
‘IpHessPPSMB52C2Kho0p
```


## Página 23

Posteriormente nos aparece la siguiente pantalla, clic en Crear base de datos.

Ahora nos pedirá el datacenter de Google Cloud, deseamos crear nuestra base 
de datos, se recomienda seleccionar la región más cercana al mercado potencial 
donde están los clientes del proyecto.

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
€>e Q °& console.firebase.google.com/u/0/project/my-cv-e292f/overview Qa oa] Se A 3944508 & even =
Firebase my-cv ¥ - Overview ®
sep . aan ,
fe
+
Get started by addin-> ; a
. oo L
sulle . | Firebase to your app -
© App Check Ps /f » A \
© App Hosting (<r) | q < )
a» Authentication
Add an app to get started
o&Se Data Connect
®& Extensions
4 Firestore Database
¢-) Functions
© Hosting
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
€>e Q & console.firebase.google.com/u/0/project/my-cv-e292f/firestore Q bl e 7% 8 4a05406& even =
© Firebase my-cv ¥ ®
Generative Al fe
+> Build with Gemini
@  Genkit (ev) +
Poesishereas Cloud Firestore ©
ED Realtime updates, powerful queries, and
Product categories automatic scaling
Build v
Run v
Analytics Y
$33 All products
Related development tools
Spats Upgrade
No-cost ($0/month) Learn more
```


## Página 24

Aparecerá un cuadro de diálogo, crearemos las reglas de seguridad para nuestra 
base de datos. Seleccionamos el modo de pruebas.

Una vez creada la base de datos de Firestore, nos aparecerá la siguiente pantalla, 
lista para crear las colecciones y documentos.

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
<€>cC Q °& console.firebase.google.com/u/0/project/my-cv-e292f/firestore Q b| e A Sdoae40 Bs even =
© Firebase my-ov ¥ a
Generative Al
fe
4 Build with Gemini Create database x
Genkit (NEw) +
7) 6 Set name and location -- @) Secure rules
Project shortcuts @
Product categories (default)
Build
Location
Run a]
nam5 (United States) Y | zg
Analytics © Your location setting is where your Cloud Firestore data will be stored
33 All products e After you set this location, you cannot change it later. Learn moreY }
Related development tc Cancel
Spark
UP
No-cost ($0/month) Led li imivore
< 0:
‘ - -- a a -
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
<>ea Q  & console.firebase.google.com/u/0/project/my-cv-e292f/firestore Q vl e A SBS fogri,0 Bs even =
© Firebase moe @
Create database x
Generative Al
fe
+ Build with Gemini @ Set name and location -- e Secure rules
@_ Genkit Ceew) +
Project shortcuts After you define your data structure, you will need to write rules to secure your data.
|B Freiowoabes .
O Start in production mode rules_version = '2';
Product categories
Your data is private by default. Client service cloud.firestore {
read/write access will only be
Build granted as specified by your security match /databases/{database}/documents {
tules. match /{document=**} {
Run allow read, write: if
(O} Start in test mode request.time < timestamp.date(2025, 1, 24);
. }
Analytics Your data is open by default to }
enable quick setup. However, you }
must update your security rules
3 All products within 30 days to enable long-term
~ client read/write access. 8 The default security rules for test mode allow anyone with your
database reference to view, edit and delete all data in your
pelstedidevelonmentitc database for the next 30 days
Spark
No-cost ($0/month) 4
. Cancel
. see
-- _ _ -- y
```


## Página 25

Crear las estructuras de de la base de datos

En la siguiente tabla, se enumeran los tipos de datos que admite Cloud Firestore :

1. Boolean values 
2. Integer and floating-point values, sorted in numerical order 
3. Date values 
4. Text string values 
5. Byte values 
6. Cloud Firestore references 
7. Geographical point values 
8. Array values 
9. Map values

En esta sección crearemos las Colecciones de Firestore, para almacenar 
documentos de nuestro proyecto. Crearemos una colección para cada llenar 
cada uno de los componentes, por tanto tendremos las siguientes colecciones:

1. header 
2. work-experience 
3. education 
4. skills 
5. certificates 
6. languages

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
«€>e Q & console.firebase.google.com/u/0/project/my-cv-e292f/firestore/databas.. Q  (h | e A 3804508 & even =
© Firebase my-cv + e@
GonerntiverAl Cloud Fi restore Add database J=i Ask Gemini how to get started with Firestore @

e
+ Build with Gemini Data Rules Indexes Disaster Recovery (NEW Usage ®& Extensions
@  Genkit (ew) -_ +
Project shortcuts
i) Protect your Cloud Firestore resources from abuse, such as billing fraud or phishing Configure App Check x Q)
Product categories Panel view Query builder
Build v
fM ® More in Google Cloud v
Run v
B (default)
Analytics v
+ Start collection
333 All products
Related development tools
Spark
No-cost ($0/month) Upapects = »
< - “0:
--=  / y
```


## Página 26

7. interests

Empezaremos por Header, recordamos los requerimientos para el componente 
Header.

Crearemos un documento con la estructura de names, dar clic en generar ID 
automático, ingresar los 3 campos de la estructura names:

1. name tipo string 
2. goalLife tipo string 
3. photoUrl tipo string 
4. email tipo string 
5. phoneNumber tipo string 
6. location tipo string 
7. socialNetwork tipo string

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
| | Elon Musk elonmusk@teslamotors.com S%
650-681-5000 &,
Aiming to reduce global warming through sustainable
energy production and consumption, and reducing the Los Angel
“risk of human extinction" by "making life multi- os Angeles, USA Q
planetary" and setting up a human colony on Mars.
elon.musk
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
€>e Q % console.firebase.google.com/u/0/project/my-cv-e292f/firestore/databases/-defau.. Q  (h | tw 7% o8O Bs even =
eo Firebase my-cv y Cloud Firestore a
Generative Al Panel view Query builder
fe
+ Build with Gemini |
: 1Google Cloud v +
(So) Gea Came Start a collection
Project shortcuts . . .
6 Give the collection an ID ---- @) Add its first document @
Product categories Parent path
/
Build v
Collection ID @
Run v
Analytics v
33: All products
Related development tools
Spark
No-cost ($0/month) steele
< “0:
. 4
```


## Página 27

Dar click en next, generar un ID  automáticamente, luego  ingresar cada atributo  
de la colección.

Nuestra colección header con el nuevo documento luce de la siguiente manera:

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
€ > @ Q %  console.firebase.google.com/u/0/project/my-cv-e292f/firestore/databases/-defau.. Ql (fh | |
oe Firebase my-cv v Cloud Firestore  -
- Document ID
f% Project Overview Fe @
YEQxeN8QGkc97WTQqQam
a
Generative Al q r
+ Build with Gemini f Gu Type Value
© Genkit (NEW) | name = string y | Adolfo Centeno ()
Project shortcuts H Field Type altel
f f
|B Frrestore Database | goalLife = string ~y Ser ingeniero de (S)
orn 4 (default) ;
roduct categories H Field Type Value
+ Start collection :
Build v :- photoUrl = string vy _ https://www.w3s (S)
Run v ; Field Type Value
; Field Type Value
#2 All products H
> phoneNumber = 2721908413 ()
Related development tools H Field Type Value
IDX @ fs location = string vy | Orizaba Ver. Mex (S) [
Checks% @ :
‘ Field Type Value
| socialNetwork = string Y | @adsoft.sito (S)
“.. @® Add field
Spark
No-cost ($0/month) Uapetste
Q Database location: nam5 Cancel
a
```


## Página 28

NOTA: Solo necesitamos un registro de la colección Header, porque de acuerdo al 
requerimiento solo se necesita un registro para llenar el componente Header. 
 
Repetimos el proceso para la colección work-experience. 
 
Para recordar el componente work-experience, debe guardar la siguiente 
información:

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
€>e Q %& console.firebase.google.com/u/0/project/my-cv-e292f/firestore/databases/-default-/da... (4 | e A JOO & & even =
e Firebase my-cv ~ Cloud Firestore a
Panel view Query builder
f% Project Overview bed fe
Generative Al A] > header > YEQxeN8QGkc9.. ® More in Google Cloud v
cos
Build with Gemini . .
+ AB (default) (2) header ar E) YEQxeN8QGkc97wTQqQam :
©  Genkit (xew) @)
+ Start collection + Add document + Start collection
Project shortcuts
header > YEQxeN8QGkc97wTQqQam > | + Add field
Product categories goalLife: "Ser ingeniero de software "
. location: "Orizaba Ver. Mexico"
Build v
name: "Adolfo Centeno"
Run ¥ phoneNumber: "2721908413"
Analytics v photoUr1: "https://www.w8schools.com/w3images/avata
socialNetwork: "@adsoft.sito"
```


## Página 29

Crearemos un documento con la estructura de work-experience, dar clic en 
generar ID automático, ingresar los  campos necesarios:

8. startDate tipo string 
9. endDate  tipo string 
10. location tipo string 
11.position tipo string 
12.company tipo string 
13.accomplishments tipo string

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
Work Experience

06/2006 - Present San Mateo, USA
Chairman

SolarCity

Accomplishments

Created a collaboration between SolarCity and Tesla to use electric
vehicle batteries to smooth the impact of rooftop solar on the power
grid.

Provided the initial concept and Financial capital.

02/2004 - Present Palo Alto, USA
CEO and Product Architect

Tesla Motors

Accomplishments

Currently oversee the company's product strategy -- including the
design, engineering and manufacturing of more and more affordable
electric vehicles for mainstream consumers.

Insisted on using carbon Fiber composite materials in the hull to
minimize weight, developed the battery module and even some
elements of design, like the headlights.

Received Global Green 2006 product design award for Tesla Roadster
design.

06/2002 - Present Hawthorne, USA
CEO and CTO

SpaceX

Accomplishments

Plans to reduce space transportation costs to enable people to colonize
Mars.

Oversee the development of rockets and spacecraft for missions to
Earth orbit and ultimately to other planets.

Developed the Falcon 9 spacecraft which replaced the space shuttle
when it retired in 2011.

03/1999 - 10/2002 San Jose, USA
CEO

X.com and PayPal

Accomplishments

Involved in the development of new business models, conducted a
successful viral marketing campaign, which led to a rapid increase in the
number of customers.

Created a method of securely transferring money using a recipient's e-
mail address.

01/1995 - 02/1999 California, USA
Co-founder

Zip2

Accomplishments

Created a platform where newspapers - including credible ones as New
York Times - could offer their customers some additional commercial
services.
```


## Página 30

…

Ahora agregamos un documento nuevo de tipo work-experience.

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
eo Firebase my-cv ~ Cloud Firestore
+ Build with Gemini
@_ Genkit (new) Panel view Query builder 3
Project shortcuts
 rrecrobaataw TS CoTeSTON pe
ri) Give the collection an ID ---- @) Add its first document .
Product categories 4
Build v Parent path
Run v /
mx"
Analytics Vv GaltzsitanlD © de software "
$3: All products
413"
Related development tools
Cancel v3schools.com/w3imag(
IDX% ® ~~~ 0ft.sito"
Spark
No-cost ($0/month) Upgrade
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
oe Firebase my-cv v Cloud Firestore
a a ------- Document parent path @
f¥ Project Overview & /work-experience
Generative Al Document ID @
+> Build with Gemini nxv8CStESIAm7jaBr4ra
@  Genkit (=) ;
‘ Field Type Value
Project shortcuts :
BE esoveDatabase (Ml > header > YEQ >| startDate = ene-2020 (S)
A (default) ‘Field Type Value
Product categories . H
Build v f
neetoir ‘Field Type Value
Run Y :
Analytics v ;
‘Field Type Value
Hf All products position 5 Frontend Develor ()
‘ Field Type Value
Related development tools :
IDXZ © :
Checks 4 @ ‘Field Type Value
io accomplishment = web plataform, a ()
“.. @® Add field
Spark
No-cost ($0/month) Upepete Cancel
Q Database location: nam5
```


## Página 31

NOTA: esta colección representa los n puestos de trabajo que  una persona ha 
tenido pueden ser  más de 1 documento.

Contamos por ahora con 2 documentos tipo work-experience

Como reto, crear las colecciones de firestore para las secciones:

1. education 
2. skills

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
oe Firebase my-cv y _Cloud Firestore
- - | Add a document
f% Project Overview bo 3
Parent path
aneenn/l /work-experience
+ Build with Gemini Document ID @
Genkit (YEW)
© | AW3bCFWx7A8SIDGxKGAo
Project shortcuts Q
k-experi H
® (default) =-- startDate = nov-2023 ()
Product categories :
+ Start collection H Field Type Value
Build v CO
insaclor “~~ endDate = string y | nov-2024 (S)
Run - work-experience H
‘Field Type Value
Analytics v + 3 -_
| location = string ~ Puebla, Mexico (S)
ee pLoducts ; Field Type Value
| position = string ~ Backend Develor (S)
Related development tools ; UC -_____J
IDX @ ; Field Type Value
Checks [4 ® = company = string ~ | kubeet SAdecv ©
H Field Type Value
*- accomplishment | = ‘string > | graph api, RES (S)
Spark
No-cost ($0/month) Upepete Cancel
|
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
eo Firebase my-cv ¥ _-_ Cloud Firestore
com oom come Samm omoceang soars © comm
fe Project Overview 2
Generative Al i*,] Protect your Cloud Firestore resources from abuse, such as billing fraud or phishing Configure App Check x
+> Build with Gemini
@  Genkit (ew) Panel view  Querybuilder =
Project shortcuts
| 2S estore Datbese iA} > work-experience > AW3bCFWx7A8.. ® More in Google Cloud Vv
B (default) (@) work-experience =: ) Aw3bCFwx7A8siIDGxKGAo H
Product categories
+ Start collection + Add document + Start collection
Build v
header AW3bCFWx7A8S1DGxKGAo > + Add field
Run ¥ work-experience > nxv8CStESIAm7jaBr4ra accomplishments: "graphql api, REST api"
Analytics v company: "kubeet SA de CV"
endDate: "nov-2024"
HE All products location: "Puebla, Mexico"
position: "Backend Developer"
Related development tools startDate: "nov-2023"
```


## Página 32

3. certificates 
4. languages 
5. interests

Conectar Angular con Firebase. 
 
Es necesario, descargar las llaves de acceso a firebase, Click en  Project 
Overview  -> Project Settings.

Posteriormente crear un  Aplicación tipo Web, Click en el icono con el símbolo 
</>

Ahora ingresa un nombre para tu  app, teclea: my-cv

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
€ >ea 1) % console.firebase.google.com/u/0/project/my-cv-e292f/settings/general a | e A SBSoOoOB8k ¢
© Firebase my-ov ¥
vvouaesuiy tti
f% Project Overview <3 Project settings e INgS
Users and permissions Viessaging Integrations Service accounts Data privacy Users and permissions
Generative Al
Usage and billing
+ Build with Gemini
@  Genkit (ew) Your project
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
<> ec Q % console.firebase.google.com/u/0/project/my-cv-e292f/settings/general?nonce=173517... (1) | S a» SoOoeBaeSs
ry) Firebase my-cv ~ _ Project settings
f& Project Overview Ce) Environment
Generative Al This setting customizes your project for different stages of the app lifecycle
+ Build with Gemini Environment type Unspecified
©  Genkit (new)
Project shortcuts
A Firestore Database Your apps
Product categories
Build v
Ruy . There are no apps in your project
Select a platform to get started
Analytics v
33: All products
```


## Página 33

El asistente nos genera keys para accesar a Firebase desde Angular, Copiar el 
Script de código como sigue, ya que las ocuparemos posteriormente. 
 
 
// Import the functions you need from the SDKs you need 
import { initializeApp } from "firebase/app"; 
// TODO: Add SDKs for Firebase products that you want to use 
// https://firebase.google.com/docs/web/setup#available-libraries 
 
// Your web app's Firebase configuration 
const firebaseConfig = { 
  apiKey: "AIzaSyDVb_5lgLQJP_3OMAGJ-FL4BBCSqkLV5Oc", 
  authDomain: "my-cv-e292f.firebaseapp.com", 
  projectId: "my-cv-e292f", 
  storageBucket: "my-cv-e292f.firebasestorage.app", 
  messagingSenderId: "18704728562", 
  appId: "1:18704728562:web:a61c4eba2ffc95a2deeb6b"

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
<> eae {) °% console.firebase.google.com/u/0/project/my-cv-e292f/settings/gene
x Add Firebase to your web app
(v} Register app
(2) Add Firebase SDK
(O} Use npm @) Use a <script> tag
If you're already using npm (4 and a module bundler such as webpack [4 or Rollup %, you can run the
following command to install the latest SDK (Learn more (4):
$ npm install firebase a
Then, initialize Firebase and begin using the SDKs for the products you'd like to use.
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
apikey: "AIzaSyDVb_51gLQJP_30MAGJ-FL4BBCSqkLV50c",
authDomain: "my-cv-e292f.firebaseapp.com",
projectId: "my-cv-e292f",
storageBucket: "my-cv-e292f.firebasestorage.app",
messagingSenderId: "18704728562",
appId: "1:18704728562 :web :a61c4eba2ffc95a2deeb6b"
a
// Initialize Firebase
const app = initializeApp(firebaseConfig) ; Ta)
Note: This option uses the modular JavaScript SDK (4, which provides reduced SDK size.
Learn more about Firebase for web: Get Started 4, Web SDK API Reference 4, Samples 4
```


## Página 34

}; 
 
// Initialize Firebase 
const app = initializeApp(firebaseConfig); 
 
 
Posteriormente, regresamos al proyecto Angular, y nos colocamos en el root del 
proyecto.

instalamos la biblioteca de firebase en nuestro proyecto. 
 
$  npm install --save @angular/fire@18.0.1

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
ee@  mycv - adsoft@adsofts-MacBook-Air - ~/mycv - -zsh - 105x29
> mycv git:(master) x ls -la

total 1016

drwxr-xr-x 17 adsoft staff 544 Nov 18 18:03 .

drwxr-x---+ 79 adsoft staff 2528 Dec 25 20:29 ..

drwxr-xr--x 3 adsoft staff 96 Nov 18 18:03 .angular
-rw-r--r--- 1 adsoft staff 274 Nov 18 16:24 .editorconfig
drwxr-xr-x 12 adsoft staff 384 Nov 18 16:26 .git

-rw-r--r--- 1 adsoft staff 587 Nov 18 16:24 .gitignore
drwxr-xr-x 5 adsoft staff 16@ Nov 18 16:24 .vscode
-rw-r--r-- 1 adsoft staff 1065 Nov 18 16:24 README.md
-rw-r--r-- 1 adsoft staff 2582 Nov 18 16:24 angular.json
drwxr-xr-x 567 adsoft staff 18144 Nov 18 16:26 node_modules
-rw-r--r-- 1 adsoft staff 484245 Nov 18 16:26 package-lock.json
-rw-r--r-- 1 adsoft staff 1035 Nov 18 16:24 package.json
drwxr-xr-x 3 adsoft staff 96 Nov 18 16:24 public

drwxr-xr-x 6 adsoft staff 192 Nov 18 16:24 src

-rw-Yr--r-- 1 adsoft staff 424 Nov 18 16:24 tsconfig.app.json
-Yw-Lr--r-- 1 adsoft staff 1021 Nov 18 16:24 tsconfig.json
-Yw-Lr--r-- 1 adsoft staff 434 Nov 18 16:24 tsconfig.spec.json
+ mycv git:(master) x fj
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
(> admin-cv git:(master) x npm install --save @angular/fire@18.0.1
added 118 packages, removed 12 packages, changed 2 packages, and audited 1066 packages in 3m
159 packages are looking for funding
run “npm fund’ for details
10 moderate severity vulnerabilities
To address all issues, run:
npm audit fix
Run “npm audit’ for details.
+ admin-cv git:(master) x fj
```


## Página 35

Ahora creamos los ambientes de desarrollo (develop y production) de nuestro 
proyecto donde colocaremos las keys de firebase. 
 
$ ng generate environments

Verificamos 
 
$ ls -la src/environments

Modificamos environment.ts con las llaves de tu proyecto firebase de la siguiente 
manera: 
 
$ nano src/environments/environment.ts

$ nano src/environments/environment.development.ts

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
|> mycv git:(master) x ng generate environments

CREATE src/environments/environment.ts (31 bytes)

CREATE src/environments/environment.development.ts (31 bytes)
UPDATE angular.json (2807 bytes)

+ mycv git:(master) x fj
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
> mycv git:(master) x 1s -la src/environments

total 16

drwxr-xr-x 4 adsoft staff 128 Dec 25 20:42 .

drwxr-xr-x 7 adsoft staff 224 Dec 25 20:42 ..

-rw-r--r-- 1 adsoft staff 31 Dec 25 20:42 environment.development.ts
-rw-r--r-- 1 adsoft staff 31 Dec 25 20:42 environment.ts

+ mycv git:(master) x fj
```

Texto de la captura (código transcrito):

```
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDVb_5lgLQJP_3OMAGJ-FL4BBCSqkLV5Oc",
    authDomain: "my-cv-e292f.firebaseapp.com",
    projectId: "my-cv-e292f",
    storageBucket: "my-cv-e292f.firebasestorage.app",
    messagingSenderId: "18704728562",
    appId: "1:18704728562:web:a61c4eba2ffc95a2deeb6b"
  }
};
```


## Página 36

Después, debemos configurar el archivo src/app/app.module.ts para soportar 
firebase en nuestro proyecto 
 
$ nano src/app/app.module.ts 
 
NOTA: se agrega línea 14, 15 para importar la biblioteca de firebase y el archivo 
del ambiente de desarrollo con las keys. En la línea  31 se inicializa el módulo 
firebase con  las keys  especificadas.

Consumo del servicio header-service

Texto de la captura (código transcrito):

```
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDVb_5lgLQJP_3OMAGJ-FL4BBCSqkLV5Oc",
    authDomain: "my-cv-e292f.firebaseapp.com",
    projectId: "my-cv-e292f",
    storageBucket: "my-cv-e292f.firebasestorage.app",
    messagingSenderId: "18704728562",
    appId: "1:18704728562:web:a61c4eba2ffc95a2deeb6b"
  }
};
```

Texto de la captura (código transcrito):

```
// La captura empieza en la línea 10; las importaciones anteriores no se muestran.
import { CertificatesComponent } from './certificates/certificates.component';
import { LanguagesComponent } from './languages/languages.component';
import { InterestsComponent } from './interests/interests.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent, HeaderComponent, WorkExperienceComponent,
    EducationComponent, SkillsComponent, CertificatesComponent,
    LanguagesComponent, InterestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


## Página 37

Para consumir de forma adecuada las colecciones de Firebase  debemos crear 
clases llamadas modelos, que contengan la misma estructura que las colecciones 
de Firebase, así podemos crear variables o arrays  en Angular del modelo 
apropiado para almacenar las colecciones. 
 
Creamos una  carpeta models en  src/app 
 
$ mkdir src/app/models

Creamos una carpeta header dentro de models 
 
$ mkdir src/app/models/header

Creamos el modelo para Header: header.model.ts 
 
$ nano src/app/models/header/header.model.ts

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
l> mycv git:(master) x mkdir src/app/models

I> mycv git:(master) x ls -la src/app

total 40

drwxr-xr-x 17 adsoft staff 544 Dec 25 21:12 .

drwxr-xr-x 7 adsoft staff 224 Dec 25 20:42 ..

-rw-Yr--r-- 1 adsoft staff @ Nov 18 16:24 app.component.css
-rw-Yr--r-- 1 adsoft staff 420 Nov 19 16:54 app.component.html
-rw-Yr--r-- 1 adsoft staff 910 Nov 18 16:24 app.component.spec.ts
-rw-Yr--r-- 1 adsoft staff 957 Nov 19 14:08 app.component.ts
-rw-Yr--r-- 1 adsoft staff 310 Nov 18 16:24 app.config.ts
-rw-Yr--r-- 1 adsoft staff 77 Nov 18 16:24 app.routes.ts
drwxr-xr-x 6 adsoft staff 192 Nov 18 23:39 certificates
drwxr-xr-x 6 adsoft staff 192 Nov 18 23:34 education
drwxr-xr-x 6 adsoft staff 192 Dec 2@ 13:40 header

drwxr-xr-x 6 adsoft staff 192 Nov 18 23:42 interests
drwxr-xr--x 6 adsoft staff 192 Nov 18 23:41 languages
drwxr-xr-x 2 adsoft staff 64 Dec 25 21:12 models

drwxr-xr-x 9 adsoft staff 288 Dec 19 14:25 services
drwxr-xr-x 6 adsoft staff 192 Nov 18 23:36 skills

drwxr-xr-x 6 adsoft staff 192 Dec 20 15:26 work-experience
```

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
|> mycv git:(master) x mkdir src/app/models/header
|> mycv git:(master) x ls -la src/app/models/header
total @

drwxr-xr-x 2 adsoft staff 64 Dec 25 21:14 .
drwxr-xr-x 3 adsoft staff 96 Dec 25 21:14 ..

+ mycv git:(master) x fj
```


## Página 38

Ahora modificamos el service header.service.ts.  
 
Importamos los módulos de firebase (línea 2), importamos el modelo 
header.model (línea 3).

Definimos el nombre  de la colección a  leer (línea 11), declaramos una variable 
para almacenar la colección Header  (línea 13).

Creamos un constructor (líneas 15 a 17), con un parámetro que inyecte una 
instancia de Firestore (línea 15), leemos la colección /header y  la  almacenamos 
en this.headerRef (línea 16).

Creamos un  método para retornar la colección recuperada de Firestore y  
almacenada en this.headerRef (líneas 19 y  21)

Texto de la captura (código transcrito):

```
export class Header {
  id?: string;
  name?: string = 'name';
  goalLife?: string = 'goal';
  photoUrl?: string = 'photo';
  email?: string = 'email@domain.com';
  phoneNumber?: string = '999-999-9999';
  location?: string = 'city, country';
  socialNetwork?: string = '@facebook';
}
```

Texto de la captura (código transcrito):

```
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Header } from '../../models/header/header.model';
```

Texto de la captura (código transcrito):

```
private dbPath = '/header';
headerRef: AngularFirestoreCollection<Header>;
```

Texto de la captura (código transcrito):

```
constructor(private db: AngularFirestore) {
  this.headerRef = db.collection(this.dbPath);
}
```


## Página 39

Podemos analizar header.service.ts completo con la siguiente instrucción. 
 
$ nano src/app/services/header-service/header.service.ts

Ahora debemos modificar el componente Header, para consumir los datos de 
firebase que lee el service. 
 
Empezamos con header.component.ts 
 
Importamos el modelo header.model (línea 3) y el operador map necesario para la 
lectura de las colecciones (línea 4)

Creamos una instancia del Modelo Header llamada header, que  almacenará el 
resultado de la lectura de Firestore  (línea 13).

Actualizamos el constructor para llamar al método getHeader del service (línea 17 
a 26), en la línea 24 se almacena  en la variable header el resultado de la lectura 
de la colección Header de Firestore.

Texto de la captura (código transcrito):

```
getHeader(): AngularFirestoreCollection<Header> {
  return this.headerRef;
}
```

Texto de la captura (código transcrito):

```
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Header } from '../../models/header/header.model';
@Injectable({ providedIn: 'root' })
export class HeaderService {
  accesoHeader = 'header service running...';
  private dbPath = '/header';
  headerRef: AngularFirestoreCollection<Header>;
  constructor(private db: AngularFirestore) {
    this.headerRef = db.collection(this.dbPath);
  }
  getHeader(): AngularFirestoreCollection<Header> {
    return this.headerRef;
  }
}
```

Texto de la captura (código transcrito):

```
import { Header } from '../models/header/header.model';
import { map } from 'rxjs/operators';
```

Texto de la captura (código transcrito):

```
header: Header = new Header();
```


## Página 40

NOTA: Como mencionamos anteriormente la colección Header solo 
guarda un documento, por tanto la variable header solo  debe 
almacenar el primer documento:  this.header = data[0];

Podemos visualizar el  código  completo de header.component.ts con la siguiente 
instrucción: 
 
$ nano src/app/header/header.component.ts

Continuamos con header.component.html, lo modificaremos para visualizar los 
cada uno de los atributos del documento de Header.

Texto de la captura (código transcrito):

```
this.headerService.getHeader().snapshotChanges().pipe(
      map(changes => changes.map(c => ({
        id: c.payload.doc.id, ...c.payload.doc.data()
      })))
    ).subscribe(data => {
      this.header = data[0];
      console.log(this.header);
    });
```

Texto de la captura (código transcrito):

```
import { Component } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  header: Header = new Header();
  constructor(public headerService: HeaderService) {
    console.log(this.headerService);
    this.headerService.getHeader().snapshotChanges().pipe(
      map(changes => changes.map(c => ({
        id: c.payload.doc.id, ...c.payload.doc.data()
      })))
    ).subscribe(data => {
      this.header = data[0];
      console.log(this.header);
    });
  }
}
```


## Página 41

$ nano src/app/header/header.component.html

Podemos probar que el componente Header ya esté lleno con los 
atributos  de  la colección: 
 
$ ng  serve

Texto de la captura (código transcrito):

```
<tr>
  <td>{{header.name}} <br> {{header.goalLife}}</td>
  <td><img src="{{header.photoUrl}}" width="200" height="200"></td>
  <td>
    {{header.email}}<br>
    {{header.phoneNumber}}<br>
    {{header.location}}<br>
    {{header.socialNetwork}}
  </td>
</tr>
```


## Página 42

Consumo del servicio work-experience-service 
 
Para consumir la colección work-experience de Firestore, creamos una carpeta 
header dentro de models 
 
$ mkdir src/app/models/work-experience

Ahora, creamos el modelo para work-experience (con  la misma estructura que  la 
colección  en Firestore): work-experience.model.ts 
 
$ nano src/app/models/header/work-experience.model.ts

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
< © Q @ localhost:4200

Adolfo Centeno . adsoft@live.com.mx

Ser ingeniero de software 2721908413
Orizaba Ver. Mexico
@adsoft.sito
```

Texto de la captura (código transcrito):

```
mkdir src/app/models/work-experience
```


## Página 43

Ahora modificamos el service de work-experience, con las mismas instrucciones  
que Header, solo cambiando  el modelo y el nombre de la colección en 
Firestore. 
Podemos visualizar el servicio completo a continuación. 
 
$ nano src/app/services/work-experience-service/work-experience.service.ts

Ahora debemos modificar el componente work-experience, para consumir los 
atributos de la colección de Firestore con los elementos que  representan la 
experiencia laboral  de una persona. 
 
Empezamos con work-experience.component.ts

Texto de la captura (código transcrito):

```
export class WorkExperience {
  id?: string;
  startDate?: string = 'mmm-yyyy';
  endDate?: string = 'mmm-yyyy';
  location?: string = 'city, country';
  position?: string = 'my position';
  company?: string = 'my company';
  accomplishments?: string = 'item1, item2, item n';
}
```

Texto de la captura (código transcrito):

```
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { WorkExperience } from '../../models/work-experience/work-experience.model';
@Injectable({ providedIn: 'root' })
export class WorkExperienceService {
  accesoWorkExperience = 'work experience running...';
  private dbPath = '/work-experience';
  workExperienceRef: AngularFirestoreCollection<WorkExperience>;
  constructor(private db: AngularFirestore) {
    this.workExperienceRef = db.collection(this.dbPath);
  }
  getWorkExperience(): AngularFirestoreCollection<WorkExperience> {
    return this.workExperienceRef;
  }
}
```


## Página 44

En este caso se define  un  array  de  objetos de tipo WorkExperience en la línea 
13.

Cuando se recupera la colección, esta contiene n  elementos que se asignan por 
completo al array workExperiece, en la línea 25

Podemos consultar el código completo a continuación: 
 
$ nano src/app/work-experience/work-experience.component.ts

Continuamos con header.component.html para visualizar los atributos  de los n 
documentos de la colección ( en  este caso  2 ). 
 
NOTA: en esta caso utilizaremos la directiva *ngFor para recorrer cada elemento 
de la colección e imprimir cada empleo  en una lista no ordenada ( <ul> .. </ul>) 
 
 
$ nano src/app/header/header.component.html

Texto de la captura (código transcrito):

```
workExperience: WorkExperience[] = [];
```

Texto de la captura (código transcrito):

```
).subscribe(data => {
  this.workExperience = data;
  console.log(this.workExperience);
});
```

Texto de la captura (código transcrito):

```
import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css'
})
export class WorkExperienceComponent {
  workExperience: WorkExperience[] = [];
  constructor(public workExperienceService: WorkExperienceService) {
    console.log(this.workExperienceService);
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes => changes.map(c => ({
        id: c.payload.doc.id, ...c.payload.doc.data()
      })))
    ).subscribe(data => {
      this.workExperience = data;
      console.log(this.workExperience);
    });
  }
}
```


## Página 45

Podemos comprobar que se visualicen correctamente los atributos de  la 
colección work-experience con: $ ng serve 
 
$ ng serve

Texto de la captura (código transcrito):

```
<ul *ngFor="let job of workExperience;">
  <li>
    {{ job.startDate }} - {{ job.endDate }} <i>{{job.location}}</i> <br>
    <b>{{ job.position }}</b> <br>
    {{ job.company }} <br>
    Logros: <br>
    {{ job.accomplishments }} <br>
  </li>
</ul>
```


## Página 46

Hasta  ahora ya hemos consumido 2 servicios y los hemos implementado  en su  
respectivo componente. Podrías consumir ahora los servicios: education, 
languages, skills, certificates e  interests  ?

Texto de la captura (OCR; pueden aparecer caracteres imperfectos o valores recortados):

```text
Adolfo Centeno Gg adsoft@live.com.mx
Ser ingeniero de software 2721908413
Orizaba Ver. Mexico
@adsoft.sito
¢ nov-2023 - nov-2024 Puebla, Mexico
Backend Developer
kubeet SA de CV
Logros:
graphql api, REST api
skills works!
¢ ene-2020 - oct-2023 Orizaba, Mexico
Frontend Developer
Waves Lab
Logros:
web plataform, android app, ios app
```


## Página 47

Sala de inspiración 
 
Todas las plataformas…

Sala de pruebas 
 
Lee cada una de las preguntas y selecciona la respuesta que consideres correcta 
 
1.- Con que instruccion instalamos las dependencias para soportar 
Firestore en nuestro proyecto Angular 18 ?

Opción a:  
  
npm --save @angular/fire

Incorrecta:  
 
La sintaxis correcta para instalar las 
dependencias de firebase son: 
 
npm install --save @angular/fire  
 
 
Opción b:  
npm install --save @fire

Incorrecta:  
 
La sintaxis correcta para instalar las 
dependencias de firebase son: 
 
npm install --save @angular/fire  
 
 
Opción c:  
 
npm install --save 
@angular/fire

CORRECTA:   
 
La sintaxis correcta para instalar las 
dependencias de firebase son: 
 
npm install --save @angular/fire  
 
 
Opción d:  
 
npm install  
@angular/firebase

Incorrecta:  
 
La sintaxis correcta para instalar las 
dependencias de firebase son:


## Página 48

npm install --save @angular/fire  
 
 
2.-  Instrucción de Angular CLI para crear los archivos de configuración 
para los ambientes de desarrollo.

Opción a:  
  
ng create environments

Incorrecta:  
 
La sintaxis  correcta de Angular CLI 
es: 
 
ng generate environments 
 
Opción b:  
 
ng g environment

Incorrecta: 
 
La sintaxis  correcta de Angular CLI 
es: 
 
ng generate environments 
 
Opción c:  
 
ng generate environment

Incorrecta:  
 
 La sintaxis  correcta de Angular 
CLI es: 
 
ng generate environments 
 
Opción d:  
 
ng generate environments

CORRECTA:   
 
La sintaxis  correcta de Angular CLI 
es: 
 
ng generate environments 
 
 
 
 
3.- Archivo de nuestro proyecto, donde configuramos nuestro proyecto para 
soportar firebase

Opción a:  
  
src/app/app.module.ts

CORRECTA 
 
El archivo correcto es:


## Página 49

src/app/app.module.ts 
 
 
Opción b:  
 
package.json

Incorrecta:  
 
El archivo correcto es: 
 
src/app/app.module.ts 
 
 
Opción c:  
 
src/app/app-routing.module.ts

Incorrecta:  
 
El archivo correcto es: 
 
src/app/app.module.ts 
 
 
Opción d:  
 
src/main.ts

Incorrecta:  
 
El archivo correcto es: 
 
src/app/app.module.ts 
 
 
 
 
 
 
Contenido (NUTRE /SIGNIFICA)-

Hasta esta sección ya hemos estudiado .. 
 
 
Pruébate  ( de los 3 temas ) 
Este es el momento ideal para realizar algunos ejercicios adicionales con angular 
y su enfoque basado en componentes.. 
 
Al finalizar el tema 2, dejamos este reto: Podrías consumir ahora los servicios: 
education, languages, skills, certificates e  interests  ? 
 
Lo podrás lograr con la siguiente secuencia de pasos


## Página 50

1.- Crea las colecciones en Firestore de cada colección 
2.- Ingresa al menos 2 documentos de cada colección de Firestore. 
3.- Crea modelos con los mismos atributos de las colecciones Firestore. 
4.- Actualiza cada servicio para leer su respectiva colección 
5.- Actualiza cada componente para inyectar el servicio 
6.- Modifica el archivo HTML de cada componente para visualizar la 
información 
7.- Realiza pruebas periódicamente con : ng  serve 
 
 
 
 
 
 
Ideas para llevar

Actualmente la mayoría de las plataformas web consumen servicios de 
diferentes fuentes como: APIs de google maps, youtube, spotify, instagram, 
facebook, whatsapp, incluso del SAT para timbrar las facturas electrónicas.

● ¿Cómo integrarias a tu proyecto alguna de estas APIs ?

El siguiente paso es investigar cómo crear servicios en Angular para diferentes 
APIs en la nube, o bien para otras fuentes de datos como: SQL server, MySQL, 
MongoDB, PostgreSql entre muchas otras. 
 
 
 
Referencias

Gechev, Minko (2024-05-23). "Meet Angular v19". Medium. Retrieved 2024-06-02.

"https://angular.dev/guide/di". angular.dev. Retrieved 2024-12-20.

"https://angular.dev/guide/templates/binding". angular.dev. Retrieved 2024-12-21.

"https://angular.dev/guide/routing". angular.dev. Retrieved 2024-12-27.

Material de consulta 
 
https://v17.angular.io/guide/architecture-services 
https://medium.com/@aqeelabbas3972/services-in-angular-b125a5b5690e 
https://www.c-sharpcorner.com/article/create-services-in-angular-application/
