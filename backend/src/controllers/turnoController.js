const Turno = require('../models/Turno');

// Crear turno (por paciente)
exports.crearTurno = async (req, res) => {
  try {
    const { fecha, hora, usuario1, usuario2 } = req.body;
    const turno = new Turno({ fecha, hora, usuario1, usuario2 });
    await turno.save();
    res.status(201).json({ message: 'Turno creado y pendiente de aceptación', turno });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cambiar estado del turno (por profesional)
exports.cambiarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body; // 'aceptado', 'rechazado', 'cancelado'

    if (!['aceptado', 'rechazado', 'cancelado'].includes(estado)) {
      return res.status(400).json({ message: 'Estado inválido' });
    }

    const turno = await Turno.findByIdAndUpdate(id, { estado }, { new: true });
    if (!turno) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }

    res.json({ message: `Turno ${estado}`, turno });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};