const { Router } = require('express');
const OrcamentoController = require('../controller/OrcamentoController');
const { validateOrcamento } = require('../validation/OrcamentoValidation');

const router = Router();
router.post('/orcamentos', validateOrcamento, OrcamentoController.create);
router.get('/orcamentos/:id', OrcamentoController.show);

module.exports = router;