const express = require('express');
const cors = require('cors');
const app = express();

const { secureMiddleware } = require('./src/middlewares/secure');


const config = require('./config/config');

app.use(express.json());
app.use(cors());
app.use(secureMiddleware.hashPassword);

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const mensajeRoutes = require('./src/routes/mensajeRoutes');
const proyectoRoutes = require('./src/routes/proyectoRoutes'); 
const inversionRoutes = require('./src/routes/inversionRoutes');

const upload = require('./src/middlewares/multer');
//manejo de errores
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: 'Error al subir la imagen.', details: err.message });
  } else if (err) {
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
  next();
});

app.use('/usuario', usuarioRoutes);
app.use('/mensaje', mensajeRoutes); 
//app.use('/proyecto', proyectoRoutes); 

app.use('/proyecto', upload.single('logoProyecto'), proyectoRoutes);
app.use('/inversion', inversionRoutes); 



app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API backend Griinvest!');
});

app.listen(config.port, () => {
  console.log(`Servidor corriendo en http://localhost:${config.port}`);
});
