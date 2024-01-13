// Sintaxis Common JS
//const express = require('express');

// Versión Imports (más nueva) hay que habilitarlo en package.json
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// Conectar a la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error))

// Definimos el puerto
const port = process.env.PORT || 4000;

// Habilitar Pug
app.set('view engine', 'pug');

// Obtener el año actual para el footer (Nuesto propio Middleware)
app.use((request, response, next) => {
    // compartir valores de un archivo a otro
    const year = new Date();
    response.locals.currentYear = year.getFullYear();
    response.locals.siteName = 'Agencia de Viajes';
    next(); // Necesario para que pase al siguiente Middleware
})

// Agregar body parser para leer los datos enviados a traves de un formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta pública
app.use(express.static('public'));

// Agregar Router
// use: Soporta todos los verbos (get,post,put,delete,etc).
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});