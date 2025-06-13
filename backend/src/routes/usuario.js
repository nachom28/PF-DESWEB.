const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Registro
router.post('/register', usuarioController.register);

// Login
router.post('/login', usuarioController.login);

// Get all usuarios
router.get('/', usuarioController.getUsuarios);

//router.get('/', usuarioController.getUsuarios);
router.get('/test', (req, res) => {
  res.send('Ruta test funcionando');
});
console.log('Cargando routes/usuario.js');
module.exports = router;