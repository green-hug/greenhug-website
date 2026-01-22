const express = require('express');
const router = express.Router();
const ImpactoEmpresaController = require('../controllers/impactoEmpresaController');

router.get('/:empresaId/', ImpactoEmpresaController.getImpactoEmpresa);
router.get('/:empresaId/resumen',ImpactoEmpresaController.getResumenEjecutivo)
router.post('/:empresaId', ImpactoEmpresaController.upsertImpacto);

module.exports = router;