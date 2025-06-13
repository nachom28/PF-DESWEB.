const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const turnoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  usuario1: { // Paciente
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  usuario2: { // Profesional
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'aceptado', 'rechazado', 'cancelado'],
    default: 'pendiente'
  }
}, {
  timestamps: true
});

turnoSchema.plugin(uniqueValidator, {
  message: '{PATH} Debe ser unico'
});

module.exports = mongoose.model('Turno', turnoSchema);