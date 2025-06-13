const express = require('express');
const router = express.Router();
const User = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// API registro (puedes implementar usando el usuarioController si prefieres)
router.post('/register', async (req, res) => {
  // Implementa aquí o usa el controlador
  res.status(501).json({ message: 'No implementado' });
});

// API Login
router.post('/login', async (req, res) => {
  const { mail, contraseña } = req.body;

  try {
    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { userId: user._id, mail: user.mail },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user._id, mail: user.mail } });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;