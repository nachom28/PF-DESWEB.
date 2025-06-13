// turnoRoutes.js - Archivo base
const express = require('express');
const router = express.Router();
const Turno = require('../models/Turno');
const Usuario = require('../models/Usuario');

// Crear turno
router.post('/', async (req, res) => {
  try {
    const { fecha, hora, usuario1, usuario2 } = req.body;

    // Buscar ambos usuarios
    const user1 = await Usuario.findById(usuario1);
    const user2 = await Usuario.findById(usuario2);

    if (!user1 || !user2) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Si ya filtras por roles en el frontend, no es necesario validar aquí

    const turno = new Turno({ fecha, hora, usuario1, usuario2 });
    await turno.save();
    res.status(201).json(turno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los turnos
router.get('/', async (req, res) => {
  try {
    const turnos = await Turno.find()
      .populate('usuario1', 'nombre apellido roles')
      .populate('usuario2', 'nombre apellido roles');
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener turno por ID
router.get('/:id', async (req, res) => {
  try {
    const turno = await Turno.findById(req.params.id)
      .populate('usuario1', 'nombre apellido roles')
      .populate('usuario2', 'nombre apellido roles');
    if (!turno) return res.status(404).json({ error: 'Turno no encontrado' });
    res.json(turno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar turno
router.delete('/:id', async (req, res) => {
  try {
    const turno = await Turno.findByIdAndDelete(req.params.id);
    if (!turno) return res.status(404).json({ error: 'Turno no encontrado' });
    res.json({ message: 'Turno eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;