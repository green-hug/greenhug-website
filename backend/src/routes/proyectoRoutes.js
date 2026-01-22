const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

router.get('/empresa/:empresaId', proyectoController.getByEmpresa);
router.get('/:id', proyectoController.getById);
router.post('/empresa/:empresaId', proyectoController.create);
router.post('/:proyectoId/impactos', proyectoController.addImpacto);
router.delete('/:id', proyectoController.delete);

module.exports = router;