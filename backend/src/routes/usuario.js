const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Registro
router.post('/register', usuarioController.register);

// Login
router.post('/login', usuarioController.login);

// (Podés agregar más rutas si querés)

// Obtener usuarios (con filtro por rol)
//router.get('/', usuarioController.getUsuarios);

module.exports = router;