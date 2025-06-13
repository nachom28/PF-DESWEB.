require('./config/config');
const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');

app.disable('x-powered-by');

app.use(cors({
  origin: function (origin, callback) {
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true
}));


// use it before all route definitions
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', '*');
  next();
});


//Configuracion global de rutas
app.use(require('./routes/index.js'));



//Realizamos la conexion a la base de datos de MongoDB
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

//Llamamos a la funcion de conexion a la base de datos
connectDB();

//Conexion
app.listen(process.env.PORT, () => {
  console.log(`Escuchando puerto: ${process.env.PORT}`);
})