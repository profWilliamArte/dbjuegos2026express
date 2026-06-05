# API REST de Videojuegos (Node.js + Express + MySQL)

Este repositorio sirve como material de apoyo y ejercicio principal para el curso de FullStack JS. Es una API RESTful con arquitectura MVC.

## Requisitos Previos
- Node.js instalado en tu máquina.
- Servidor MySQL (por ejemplo, XAMPP o MySQL Workbench).

## Instrucciones de Instalación

1. **Clonar el repositorio y entrar en la carpeta:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DE_LA_CARPETA>
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**
   - Duplica el archivo `.env.example` y renómbralo a `.env`.
   - Modifica las credenciales en el `.env` (usuario y contraseña de MySQL) si son diferentes en tu máquina.

4. **Configurar la Base de Datos:**
   - Abre tu cliente de base de datos (por ejemplo, phpMyAdmin).
   - Importa el archivo `data/dbjuegos.sql`. Este archivo creará automáticamente la base de datos `dbjuegos2026` y poblará las tablas con datos de prueba.

5. **Levantar el servidor en entorno de desarrollo:**
   ```bash
   npm run dev
   ```
   *El servidor debería estar corriendo en `http://localhost:3000`.*

## Documentación y Guía de Estudio
Hemos preparado una guía paso a paso explicando cómo se estructuró este proyecto y qué significa la arquitectura MVC. 
Puedes leerla aquí: **[Guía Paso a Paso](./docs/guia_paso_a_paso.md)**

## Estructura del Proyecto
- `app.js`: Punto de entrada de la aplicación y configuración de middleware.
- `config/`: Configuración del pool de conexiones a MySQL.
- `controllers/`: Lógica de base de datos y negocio.
- `routes/`: Definición de los endpoints.
- `data/`: Scripts SQL.
- `docs/`: Documentación y guías de estudio.
