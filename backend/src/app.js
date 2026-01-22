const express = require('express');
const cors = require('cors');
const empresaRoutes = require('./routes/empresaRoutes');
const impactoRoutes = require('./routes/impactoRoutes');
const proyectoRoutes = require('./routes/proyectoRoutes');
const rankingRoutes = require('./routes/rankingRoutes');
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/empresas', empresaRoutes);
app.use('/api/impacto', impactoRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/ranking', rankingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Ranking Ecológico de Empresas' });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;