const { body, param, query, validationResult } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};  

const empresaValidations = {
  create: validate([
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('tipo_empresa').isIn(['Manufactura', 'Retail', 'Servicios', 'Tecnologia', 'Alimentos', 'Construccion', 'Logistica', 'Farmaceutica']),
    body('region').isIn(['Norte', 'Sur', 'Centro', 'Metropolitana']),
    body('ciudad').notEmpty(),
    body('pais').notEmpty()
  ])
};

const impacto_anualValidations = {
  create: validate([
    body('ano').isInt({ min: 1980, max: 2100 }),
    body('litrosAgua').optional().isInt({ min: 0 }),
    body('arbolesPlantados').optional().isInt({ min: 0 }),
    body('botellasRecicladas').optional().isInt({ min: 0 }),
    body('voluntarios').optional().isInt({ min: 0 }),
    body('uniformesReciclados').optional().isInt({ min: 0 }),
    body('co2Kg').optional().isFloat({ min: 0 })
  ])
};

module.exports = {
  empresaValidations,
  impacto_anualValidations
};