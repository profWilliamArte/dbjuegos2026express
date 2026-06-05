# Guía Paso a Paso: API REST con Node.js, Express y MySQL (Arquitectura MVC)

Esta guía documenta la creación de nuestra API de videojuegos desde cero, aplicando buenas prácticas y el patrón de diseño MVC.

## Paso 1: Inicializar el Proyecto

Primero, creamos un nuevo proyecto de Node.js. En la terminal, dentro de la carpeta del proyecto, ejecutamos:

```bash
npm init -y
```
Esto creará el archivo `package.json` con la configuración inicial por defecto.

*Nota:* Recuerda agregar `"type": "module"` en tu `package.json` para habilitar la sintaxis moderna de `import/export` (ECMAScript Modules) en lugar del clásico `require()`.

## Paso 2: Instalar Dependencias

A continuación, instalamos las librerías esenciales para nuestra API:

```bash
npm install express mysql2 dotenv
```

- **`express`**: El framework minimalista que utilizaremos para crear nuestro servidor web y manejar las rutas (endpoints).
- **`mysql2`**: El controlador (driver) moderno que nos permite conectar Node.js con nuestra base de datos MySQL usando promesas (`async/await`).
- **`dotenv`**: Una librería para cargar variables de entorno desde un archivo `.env`, manteniendo seguras nuestras credenciales y configuración del puerto.

## Paso 3: Estructura de Carpetas

Para mantener nuestro código limpio y escalable, dividiremos el proyecto en la siguiente estructura de carpetas:

```text
/
├── config/
│   └── db.js                 # Configuración y pool de conexión a la base de datos
├── controllers/
│   ├── juegosController.js   # Lógica de negocio (SQL y manejo de respuestas)
│   ├── generosController.js  # Lógica de géneros
│   └── plataformasController.js # Lógica de plataformas
├── routes/
│   ├── juegos.js             # Definición de endpoints y delegación a controladores
│   ├── generos.js            
│   └── plataformas.js        
├── data/
│   └── dbjuegos.sql          # Script de base de datos para despliegue inicial
├── docs/                     
│   └── guia_paso_a_paso.md   # Documentación del proyecto
├── .env                      # Variables de entorno (credenciales, no se sube a Git)
├── app.js                    # Archivo principal que arranca y configura el servidor
└── package.json              # Dependencias y scripts del proyecto (ej. npm run dev)
```

## Paso 4: Arquitectura MVC (Modelo-Vista-Controlador)

En este proyecto estamos utilizando el patrón **MVC**, una de las arquitecturas de software más utilizadas en la industria, adaptada para la creación de APIs REST.

### ¿Qué es el MVC?
El MVC es un patrón de diseño que separa la aplicación en tres capas principales:
1. **Modelo (Model):** Representa los datos y las reglas de negocio. Se encarga de interactuar directamente con la base de datos. En nuestro proyecto, las consultas a través de `pool.query` cumplen esta función (en proyectos más grandes, se usan ORMs como Sequelize o Prisma).
2. **Vista (View):** Representa la interfaz que interactúa con el usuario. Al ser una API REST sin entorno gráfico, nuestra "vista" es simplemente la respuesta en formato **JSON** que enviamos al cliente.
3. **Controlador (Controller):** Es el "cerebro" intermediario. Recibe la petición del usuario (desde las rutas), le pide datos al Modelo, aplica cualquier lógica necesaria, y finalmente le devuelve esos datos a la Vista (JSON).

### ¿Por qué lo usamos y qué ventajas trae?
Si escribiéramos todo en `app.js`, rápidamente tendríamos un archivo gigante ("código espagueti") muy difícil de leer y modificar. El MVC resuelve esto:

- **Separación de Responsabilidades (Separation of Concerns):** Cada archivo tiene un único propósito. Las rutas en `routes/` solo deciden *a dónde* va una petición. Los controladores en `controllers/` deciden *qué hacer* con ella.
- **Mantenibilidad y Código Limpio:** Si hay un error en la lógica de actualizar un juego, sabes exactamente que debes revisar `controllers/juegosController.js` y no buscar entre miles de líneas en `app.js`.
- **Escalabilidad:** Si el proyecto crece (por ejemplo, añadiendo usuarios, compras o reseñas), simplemente creamos un nuevo controlador y sus rutas, sin romper lo existente.
- **Trabajo en Equipo:** Permite que varios programadores trabajen en el mismo proyecto simultáneamente sin pisarse el código; uno puede trabajar en un controlador mientras otro hace las rutas de otra entidad.
