//const express = require('express');
//const router = express.Router();
//const Usuario = require('../models/Usuario');
//const bcrypt = require('bcryptjs');
//
//
//router.post('/', async (req, res) => {
//  const { nombre, apellido, email, telefono, direccion, password,genero,rol } = req.body;
//  try {
//    const existe = await Usuario.findOne({ email });
//    if (existe) return res.status(400).json({ error: 'El usuario ya existe' });
//
//    const hashedPassword = await bcrypt.hash(password, 10);
//    const nuevoUsuario = new Usuario({
//      nombre,
//      apellido,
//      email,
//      telefono,
//      direccion,
//      password: hashedPassword,
//      genero,
//      rol,
//    });
//    await nuevoUsuario.save();
//    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
//  } catch (err) {
//    res.status(500).json({ error: 'Error en registro' });
//  }
//});
//
//module.exports = router;