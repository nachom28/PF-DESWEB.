const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');


router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

module.exports = router;