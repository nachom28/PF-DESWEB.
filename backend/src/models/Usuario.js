const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellido: {
    type: String,
    required: true,
    trim: true
  },
  dni: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  mail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  contraseña: {
    type: String,
    required: true
  },
    roles: {
    type: [String],
    enum: ['Paciente',"Profesional"]      
    },
    telefono: {
    type : String,
    required: true,
    trim: true
  },
  direccion: {
    type: String,
    required: true,
    trim: true
  },
  ciudad: {
    type: String,
    required: true,
    trim: true
  },


},
{
  timestamps: true
});

usuarioSchema.plugin(uniqueValidator, {
  message: '{PATH} Debe ser unico'
});


module.exports = mongoose.model('Usuario', usuarioSchema);