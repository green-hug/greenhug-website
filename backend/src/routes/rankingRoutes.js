const express = require('express');
const router = express.Router();
const rankingController = require('../controllers/rankingController');

router.get('/', rankingController.getRankingGeneral);
router.get('/region/:region', rankingController.getRankingPorRegion);
router.get('/tipo/:tipo', rankingController.getRankingPorTipoEmpresa);

module.exports = router;