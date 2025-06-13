const express = require('express');
const app = express();

// Middlewares para parsear JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas
const usuarioRoutes = require('./usuario');
const turnoRoutes = require('./turno');

// Rutas de usuario (registro, login, etc.)
app.use('/api/usuarios', usuarioRoutes);

// Rutas de turnos
app.use('/api/turnos', turnoRoutes);

module.exports = app;