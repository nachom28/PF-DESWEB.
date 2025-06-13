const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuario');
const loginRoutes = require('./login');
const turnoRoutes = require('./turno');
//const registroRoutes = require('./registro');

router.use('/usuarios', usuarioRoutes);
router.use('/login', loginRoutes);
router.use('/turnos', turnoRoutes);
//router.use('/registro', registroRoutes);
console.log('Cargando routes/index.js');

module.exports = router;