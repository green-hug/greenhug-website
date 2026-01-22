const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');
const { empresaValidations } = require('../middlewares/validationMiddleware');

router.get('/', empresaController.list);
router.get('/:id', empresaController.getById);
router.post('/', empresaValidations.create, empresaController.create);
router.put('/:id', empresaValidations.create, empresaController.update);
router.delete('/:id', empresaController.delete);

module.exports = router;