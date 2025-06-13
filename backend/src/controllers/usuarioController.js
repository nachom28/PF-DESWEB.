const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.register = async (req, res) => {
  try {
    const { nombre, apellido, dni, fechaNacimiento, mail, contraseña, roles, telefono, direccion, ciudad } = req.body;

    // Verifica si el mail ya está registrado
    const usuarioExistente = await Usuario.findOne({ mail });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El mail ya está registrado' });
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    
    const usuario = new Usuario({
      nombre,
      apellido,
      dni,
      fechaNacimiento,
      mail,
      contraseña: hashedPassword,
      roles,
      telefono,
      direccion,
      ciudad,
    });

    await usuario.save();
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Login usuario
exports.login = async (req, res) => {
  try {
    const { mail, contraseña } = req.body;
    const usuario = await Usuario.findOne({ mail });
    if (!usuario) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { usuarioId: usuario._id, mail: usuario.mail },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    res.json({ token, usuario: { id: usuario._id, mail: usuario.mail, roles: usuario.roles } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Si se incluye contraseña, hashearla antes de guardar
    if (updateData.contraseña) {
      updateData.contraseña = await bcrypt.hash(updateData.contraseña, 10);
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, updateData, { new: true });

    if (!usuarioActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado correctamente', usuario: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
