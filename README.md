**GRUPO 10**

**INTEGRANTES** 
Ramiro Stallone
Ignacio Ramirez Labadie
Juan Foricher Castellón
Emmanuel Franco
Ignacio Callava

**API REST - Sistema de Gestión Académica (TP 4)**
Descripción del Proyecto
Esta es una API REST desarrollada para la gestión de un sistema académico, permitiendo la administración de alumnos, profesores, materias y notas. El proyecto implementa operaciones *CRUD (Crear, Leer, Actualizar, Eliminar)* para cada entidad y utiliza un sistema de persistencia de datos local basado en archivos JSON.

La arquitectura del proyecto sigue el patrón *MVC (Modelo-Vista-Controlador)* adaptado para una API, separando la lógica de ruteo, validación, controladores y modelos de datos. Los modelos están desarrollados aplicando conceptos de Programación Orientada a Objetos (POO) como herencia y polimorfismo.

**Metodología de trabajo con Git y GitHub**

El desarrollo del proyecto se llevó a cabo utilizando un flujo de trabajo colaborativo basado en ramas (Branching):

Rama main: Contiene el código de producción estable y funcional.

Rama dev: Rama principal de integración donde se unifica el trabajo en progreso.

Rama personal: Cada integrante creó su propia rama derivada de dev para trabajar de forma ordenada por alumno.

Pull Requests (PR): Los cambios se integraron mediante PRs hacia dev, asegurando la revisión del código antes de fusionarlo.

**Tecnologías Utilizadas**

Entorno de ejecución: Node.js

Framework web: Express.js

Lenguajes: JavaScript (Lógica de API) y TypeScript (Modelado de clases)

Persistencia: File System (fs.promises) con archivos JSON

Middlewares: CORS, Express JSON parser, Validadores personalizados

Contenedores: Docker

**Distribución de los archivos y carpetas**

El proyecto está estructurado bajo el patrón MVC adaptado para APIs:  

/controllers: Contiene la lógica principal de negocio. Funciones asíncronas que interactúan con el File System para leer y escribir los JSON.

/data: Directorio de persistencia. Almacena los archivos alumnos.json, sys-materias.json, sys-notas.json y sys-profesores.json.

/middleware: Scripts de validación que interceptan las peticiones antes de llegar al controlador.

/models: Definición de clases usando TypeScript con herencia (ej. AlumnoModel hereda de PersonaModel).

/routes: Define los endpoints de la API y los asocia con sus respectivos middlewares y controladores.

**Explicación de las Funciones**

1. Controladores (Ejemplo basado en alumno.controller.js)
getAlumnoAll / get...All: Función asíncrona que utiliza fs.readFile para leer el archivo JSON correspondiente. Parsea la información de texto a un array de objetos JavaScript y lo retorna con un estado HTTP 200.  

getAlumnoById / get...ById: Recibe un parámetro por la URL (req.params). Lee el archivo JSON, utiliza el método .find() de los arrays para buscar el elemento que coincida con el ID/Legajo aportado. Si no existe, retorna un error 404; si existe, devuelve el objeto. 

postNewAlumno / post...: Recibe datos por el cuerpo de la petición (req.body). Primero, verifica con .some() que no exista un registro duplicado (ej. email o ID). Luego, calcula el ID/Legajo máximo actual usando Math.max() y le suma 1 para autoincrementar. Instancia un nuevo objeto de la clase correspondiente (ej. AlumnoModel), obtiene sus atributos planos y lo pushea al array. Finalmente, reescribe el JSON con fs.writeFile.  

put...ById: Busca el índice del elemento en el array utilizando .findIndex(). Valida que el ID exista y que no haya conflictos de duplicidad con otros registros. Instancia un objeto temporal con los datos antiguos, aplica métodos Setters para actualizar solo los campos enviados en el body, y sobrescribe la posición en el array antes de guardar en el JSON.  

delete...ById: Busca el índice del registro. Si existe, utiliza el método .splice(index, 1) para remover el elemento del array en memoria y guarda los cambios en el disco.  

2. Modelos Orientados a Objetos (TypeScript)

Constructor: Inicializa las propiedades de la clase al crear una nueva instancia.  

Getters y Setters: Métodos públicos (ej. getNombre(), setNota()) que permiten acceder y modificar las propiedades privadas o protegidas de la clase, garantizando el encapsulamiento.  

getAllAttributes(): Método presente en todas las clases que retorna un objeto literal con las propiedades de la instancia. En las clases hijas (como AlumnoModel o ProfesorModel), este método aplica polimorfismo (override) para sobreescribir el comportamiento de la clase padre (PersonaModel) y retornar todos los campos combinados.  

3. Middlewares de Validación

validate...Post / validate...Put: Funciones que reciben (req, res, next). Crean un array de errors. Verifican que los campos obligatorios existan, que los tipos de datos sean correctos (typeof variable === 'string' / 'number'), y aplican reglas lógicas (ej. que una nota esté entre 0 y 10, o que el email contenga un @). Si el array de errores tiene elementos, corta el flujo con res.status(400) y devuelve los errores. Si todo está correcto, llama a next() para pasar al controlador.  

**Estructura de los Archivos JSON**

En esta seccion presenta un ejemplo unitario de cómo se estructuran los objetos dentro de los arrays en cada archivo de datos:

*alumnos.json*
{
  "legajo": 10001,
  "nombre": "Mora",
  "apellido": "García",
  "email": "m.garcia@facultad.edu.ar",
  "fechaAlta": "2026-03-02",
  "modificacion": "2026-03-02",
  "isActive": true
}

*sys-materias.json*
{
  "idMateria": "MAT101",
  "nombre": "Matemática I",
  "cuatrimestre": 1
}

*sys-notas.json*
{
  "id": 1,
  "legajo": 10001,
  "idMateria": "MAT101",
  "nota": 9,
  "fecha": "03-04-24"
}

*sys-profesores.json*
{
  "idProfesor": 1,
  "nombre": "Carlos",
  "apellido": "López",
  "email": "c.lopez@facultad.edu.ar",
  "especialidad": "Bases de Datos",
  "isActive": true
}


**Estructura del Proyecto**

/controllers: Contiene la lógica principal de la API. Interactúa con los modelos y los archivos JSON.

/data: Directorio donde se almacenan los archivos .json que actúan como base de datos (alumnos.json, sys-materias.json, sys-notas.json, sys-profesores.json).

/middleware: Validaciones de entrada (POST y PUT) para asegurar la integridad de los datos antes de que lleguen a los controladores.

/models: Definición de clases usando TypeScript (PersonaModel, AlumnoModel, ProfesorModel, etc.).

/routes: Definición de los endpoints y conexión con los middlewares y controladores.

*Endpoints de la API*

**Alumnos (/alumnos)**
GET /alumnos: Devuelve la lista completa de alumnos.

GET /alumnos/:legajo: Devuelve los detalles de un alumno específico.

POST /alumnos: Crea un nuevo alumno. (Requiere nombre, apellido, email).

PUT /alumnos/:legajo: Modifica los datos de un alumno existente.

DELETE /alumnos/:legajo: Elimina un alumno del sistema.

**Profesores (/profesores)**
GET /profesores: Devuelve la lista completa de profesores.

GET /profesores/:idProfesor: Devuelve los detalles de un profesor específico.

POST /profesores: Crea un nuevo profesor. (Requiere nombre, apellido, email, especialidad).

PUT /profesores/:idProfesor: Modifica los datos de un profesor.

DELETE /profesores/:idProfesor: Elimina un profesor del sistema.

**Materias (/materias)**
GET /materias: Devuelve todas las materias registradas.

GET /materias/:id: Devuelve una materia por su ID.

POST /materias: Crea una nueva materia. (Requiere idMateria, nombre, cuatrimestre).

PUT /materias/:id: Modifica una materia existente.

DELETE /materias/:id: Elimina una materia.

**Notas (/notas)**
GET /notas: Devuelve el registro completo de notas.

GET /notas/:id: Devuelve una nota por su ID de registro.

POST /notas: Registra una nueva nota. (Requiere legajo, idMateria, nota).

PUT /notas/:id: Modifica un registro de nota.

DELETE /notas/:id: Elimina un registro de nota.

**Validaciones y Manejo de Errores**
El proyecto cuenta con middlewares específicos (validator-post y validator-put) para cada entidad que interceptan las peticiones y verifican:

Presencia de campos obligatorios.

Tipos de datos correctos (strings, numbers, booleans).

Formatos válidos (por ejemplo, validación del formato de email y rangos lógicos para las notas y cuatrimestres).

Prevención de duplicidad de datos únicos (como el email o el ID de la materia).

En caso de enviar datos inválidos o intentar acceder a recursos inexistentes, la API responde con los códigos de estado HTTP correspondientes (400 Bad Request, 404 Not Found, 409 Conflict, 500 Internal Server Error).

**Documentación**
La documentación interactiva de todos los endpoints (GET, POST, PUT, DELETE) fue elaborada utilizando Postman. Podés acceder a ella a través del siguiente enlace:  

*Documentación Postman*: https://documenter.getpostman.com/view/55293974/2sBXwnsBXc

**Links del Proyecto**

Deploy de la API (Render): https://tp4-grupo10.onrender.com

Repositorio del Front-end: https://github.com/EmmanuelF90/tp4-front


