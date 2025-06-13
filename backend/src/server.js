require('./config/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.disable('x-powered-by');

// Habilitar CORS para todas las rutas
app.use(cors());

// Si necesitas headers personalizados, puedes agregar esto:
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Middleware para parsear JSON
app.use(express.json());

// Configuración global de rutas
app.use('/api', require('./routes/index.js'));

// Conexión a la base de datos de MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://carigmer28:OAc29VWiF47kL3ym@pf-desweb.dwzynpa.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Escuchando puerto: ${process.env.PORT}`);
});