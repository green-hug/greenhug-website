const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta de login
router.post('/login', authController.login);

// Ruta para verificar token
router.get('/verify', authController.verifyToken);

// Ruta para crear admin por defecto (solo si no existen usuarios)
router.post('/setup', authController.createDefaultAdmin);

module.exports = router;