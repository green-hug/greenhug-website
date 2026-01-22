const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { authenticate, requireAdmin, requireSuperAdmin } = require('../middlewares/authMiddleware');

// Todas las rutas requieren autenticación
router.use(authenticate);

// Listar usuarios - requiere permisos de admin
router.get('/', requireAdmin, usuarioController.list);

// Obtener usuario por ID - requiere permisos de admin
router.get('/:id', requireAdmin, usuarioController.getById);

// Crear usuario - requiere permisos de super admin
router.post('/', requireSuperAdmin, usuarioController.create);

// Actualizar usuario - requiere permisos de super admin
router.put('/:id', requireSuperAdmin, usuarioController.update);

// Eliminar usuario - requiere permisos de super admin
router.delete('/:id', requireSuperAdmin, usuarioController.delete);

module.exports = router;